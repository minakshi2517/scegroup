import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "cars");
const headers = { "User-Agent": "SCEFleetImageFetch/1.0 (local car rental site build)", Accept: "application/json,image/*" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const jobs = [
  { slug: "punch-2024", query: "Tata Punch compact SUV", must: ["punch"], avoid: ["pdf", "magazine", "cartoon", "cover"] },
  { slug: "thar-3-door", query: "2021 Mahindra Thar front", must: ["thar"], avoid: ["2011", "2010", "2009", "crde", "old"] },
  { slug: "scorpio-n", query: "Mahindra Scorpio-N 2022 front", must: ["scorpio"], avoid: ["classic", "getaway", "2005", "2008", "2012"] },
  { slug: "grand-vitara-2024", query: "Maruti Suzuki Grand Vitara 2022 India", must: ["vitara"], prefer: ["grand"] },
  { slug: "swift-new", query: "2024 Maruti Suzuki Swift front India", must: ["swift"], avoid: ["dzire", "2008", "2010"] },
];

async function candidates(query) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "10");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime");
  url.searchParams.set("iiurlwidth", "1400");
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  return Object.values(data.query?.pages ?? {});
}

function pick(pages, job) {
  const ranked = pages
    .map((page) => {
      const info = page.imageinfo?.[0];
      const title = page.title || "";
      const t = title.toLowerCase();
      if (!info?.thumburl || !String(info.mime || "").startsWith("image/")) return null;
      if ((job.must || []).some((w) => !t.includes(w))) return null;
      if ((job.avoid || []).some((w) => t.includes(w))) return null;
      if (t.includes("logo") || t.includes("interior") || t.includes("engine")) return null;
      let score = 0;
      if ((job.prefer || []).every((w) => t.includes(w))) score += 5;
      if (t.includes("front")) score += 3;
      if (t.includes("2020") || t.includes("2021") || t.includes("2022") || t.includes("2023") || t.includes("2024") || t.includes("2025")) score += 2;
      return { title, src: info.thumburl, mime: info.mime, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  return ranked[0] || null;
}

await copyFile(path.join(outDir, "scorpio-n.jpg"), path.join(outDir, "scorpio-s11.jpg"));

const saved = {};
for (const job of jobs) {
  try {
    const pages = await candidates(job.query);
    const hit = pick(pages, job);
    if (!hit) {
      console.log("MISS", job.slug, pages.map((p) => p.title).join(" | "));
    } else {
      const res = await fetch(hit.src, { headers });
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = hit.mime.includes("png") ? "png" : "jpg";
      await writeFile(path.join(outDir, `${job.slug}.${ext}`), buf);
      saved[job.slug] = `/cars/${job.slug}.${ext}`;
      console.log("OK", job.slug, hit.score, hit.title);
    }
  } catch (error) {
    console.log("ERR", job.slug, error.message);
  }
  await sleep(800);
}

const mapPath = path.join(root, "src", "data", "images.ts");
const current = await import("../src/data/images.ts").catch(() => null);
console.log("SAVED", JSON.stringify(saved));
console.log("NOTE update images.ts manually if import failed", Boolean(current));
