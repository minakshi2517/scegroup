const headers = { "User-Agent": "SCEFleetImageFetch/1.0 (local car rental site build)" };
const qs = [
  'intitle:"Scorpio-N"',
  'intitle:"Scorpio N"',
  'intitle:"Thar LX"',
  'intitle:"Mahindra Thar" 2020',
  "Mahindra Thar ROXX",
];
for (const q of qs) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("list", "search");
  url.searchParams.set("srsearch", q);
  url.searchParams.set("srnamespace", "6");
  url.searchParams.set("srlimit", "8");
  const data = await (await fetch(url, { headers })).json();
  console.log("\n## " + q);
  console.log((data.query?.search || []).map((p) => p.title).join("\n") || "none");
  await new Promise((r) => setTimeout(r, 400));
}
