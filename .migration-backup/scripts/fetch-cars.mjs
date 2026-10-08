import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "cars");

const jobs = [
  ["venue-2025", "Hyundai Venue SUV front exterior"],
  ["venue-2026", "Hyundai Venue 2025 facelift front"],
  ["nexon", "Tata Nexon SUV front exterior"],
  ["punch-2026", "Tata Punch 2025 facelift front"],
  ["punch-2024", "Tata Punch compact SUV front"],
  ["curvv-2024", "Tata Curvv coupe SUV front"],
  ["fronx-grey-2025", "Maruti Suzuki Fronx grey front"],
  ["fronx-white-2026", "Maruti Suzuki Fronx white front"],
  ["swift", "Maruti Suzuki Swift hatchback red front"],
  ["swift-white", "Maruti Suzuki Swift white hatchback front"],
  ["scorpio-s11", "Mahindra Scorpio Classic SUV front"],
  ["scorpio-n", "Mahindra Scorpio-N SUV front exterior"],
  ["scorpio-n-facelift", "Mahindra Scorpio-N 2024 facelift front"],
  ["thar-3-door", "Mahindra Thar 3-door SUV front"],
  ["thar-roxx", "Mahindra Thar Roxx SUV front"],
  ["exter", "Hyundai Exter hatchback front"],
  ["xuv700", "Mahindra XUV700 SUV front exterior"],
  ["xuv-3xo", "Mahindra XUV 3XO front exterior"],
  ["baleno-2026", "Maruti Suzuki Baleno 2024 hatchback front"],
  ["baleno-2024", "Maruti Suzuki Baleno hatchback silver front"],
  ["seltos-2024", "Kia Seltos SUV front exterior"],
  ["grand-vitara-2024", "Maruti Suzuki Grand Vitara SUV front"],
  ["hero", "Mahindra Thar driving road exterior"],
  ["cta", "car headlights night road cinematic"],
];

const headers = {
  "User-Agent": "SCEFleetImageFetch/1.0 (local site build; educational car rental website)",
  Accept: "application/json,image/*",
};

function badTitle(title) {
  const t = title.toLowerCase();
  return ["logo", "icon", "diagram", "engine bay", "interior", "dashboard", "sketch", "map", "flag", "poster", "advert"].some((w) => t.includes(w));
}

async function search(query) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "12");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|size");
  url.searchParams.set("iiurlwidth", "1600");
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data.query?.pages ?? {});
  const ranked = pages
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info) return null;
      const mime = info.mime || "";
      if (!mime.startsWith("image/") || mime.includes("svg") || mime.includes("gif")) return null;
      const title = page.title || "";
      if (badTitle(title)) return null;
      const width = info.thumbwidth || info.width || 0;
      if (width < 480) return null;
      let score = width / 1000;
      if (mime.includes("jpeg")) score += 2;
      const t = title.toLowerCase();
      if (t.includes("front") || t.includes("exterior")) score += 3;
      return { title, src: info.thumburl || info.url, mime, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  return ranked[0] ?? null;
}

async function download(slug, query) {
  const hit = await search(query);
  if (!hit) {
    console.log("MISS", slug);
    return null;
  }
  const res = await fetch(hit.src, { headers });
  if (!res.ok) {
    console.log("FAIL", slug, res.status);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) {
    console.log("TINY", slug);
    return null;
  }
  const ext = hit.mime.includes("png") ? "png" : "jpg";
  const file = `${slug}.${ext}`;
  await writeFile(path.join(outDir, file), buf);
  console.log("OK", slug, buf.length, hit.title);
  return `/cars/${file}`;
}

await mkdir(outDir, { recursive: true });
await mkdir(path.join(root, "src", "data"), { recursive: true });
const images = {};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
for (const [slug, query] of jobs) {
  try {
    const src = await download(slug, query);
    if (src) images[slug] = src;
  } catch (error) {
    console.log("ERR", slug, error.message);
    if (String(error.message).includes("429")) {
      await sleep(8000);
      try {
        const src = await download(slug, query);
        if (src) images[slug] = src;
      } catch (retryError) {
        console.log("RETRY", slug, retryError.message);
      }
    }
  }
  await sleep(1200);
}

const fallbacks = [
  ["hatch", "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80"],
  ["suv", "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80"],
  ["premium", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80"],
  ["night", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"],
];

async function downloadDirect(name, url) {
  const res = await fetch(url, { headers: { "User-Agent": headers["User-Agent"], Accept: "image/*" } });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  const file = `${name}.jpg`;
  await writeFile(path.join(outDir, file), buf);
  console.log("FALLBACK", name, buf.length);
  return `/cars/${file}`;
}

for (const [name, url] of fallbacks) {
  if (!images[name]) {
    try {
      const src = await downloadDirect(name, url);
      if (src) images[name] = src;
    } catch (error) {
      console.log("FB ERR", name, error.message);
    }
  }
}

if (!images.hero) images.hero = images["thar-3-door"] || images.suv || images.night || "";
if (!images.cta) images.cta = images.night || images.premium || images.hero || "";

const ts = `/* Generated by scripts/fetch-cars.mjs */\nexport const carImages: Record<string, string> = ${JSON.stringify(images, null, 2)};\n`;
await writeFile(path.join(root, "src", "data", "images.ts"), ts);
console.log("WROTE", Object.keys(images).length);
