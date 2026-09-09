const CORS = {
  "access-control-allow-origin": "*",
  "cache-control": "public, max-age=60",
  "content-type": "application/json",
};

async function fetchSP500() {
  const r = await fetch(
    "https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?range=1d&interval=1d",
    { headers: { "user-agent": "Mozilla/5.0", accept: "application/json" } }
  );
  if (!r.ok) throw new Error(`yahoo ${r.status}`);
  const j = await r.json();
  return j?.chart?.result?.[0]?.meta?.regularMarketPrice ?? null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/sp500") {
      let sp500 = null;
      try {
        sp500 = await fetchSP500();
      } catch (e) {}
      return new Response(JSON.stringify({ sp500 }), { headers: CORS });
    }

    return env.ASSETS.fetch(request);
  },
};
