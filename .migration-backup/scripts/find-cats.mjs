const headers = { "User-Agent": "SCEFleetImageFetch/1.0 (local car rental site build)" };
const cats = ["Category:Mahindra_Scorpio", "Category:Mahindra_Thar", "Category:Mahindra_Scorpio-N", "Category:Suzuki_Grand_Vitara"];
for (const cat of cats) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("list", "categorymembers");
  url.searchParams.set("cmtitle", cat);
  url.searchParams.set("cmtype", "file");
  url.searchParams.set("cmlimit", "20");
  const data = await (await fetch(url, { headers })).json();
  console.log("\n## " + cat);
  console.log((data.query?.categorymembers || []).map((p) => p.title).join("\n") || JSON.stringify(data.error || "none"));
}
