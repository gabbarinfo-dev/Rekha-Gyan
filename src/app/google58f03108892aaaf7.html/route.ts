export async function GET() {
  return new Response("google-site-verification: google58f03108892aaaf7.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
