export function onRequest() {
  return new Response(
    JSON.stringify({
      error: "This Cloudflare Pages site serves the public directory only.",
    }),
    {
      status: 404,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}
