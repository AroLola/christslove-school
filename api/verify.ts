export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) return new Response('Missing token', { status: 400 });

    const response = await fetch('https://github.com', {
      headers: {
        'Authorization': `token ${token.trim()}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function'
      }
    });

    const data = await response.json();
    return new Response(JSON.stringify({ ok: response.ok, status: response.status, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
