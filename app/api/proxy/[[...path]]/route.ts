// app/api/proxy/[[...path]]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.BACKEND_URL;

function filterResponseHeaders(headers: Headers) {
  const out: Record<string, string> = {};
  headers.forEach((v, k) => {
    const key = k.toLowerCase();
    if (['transfer-encoding', 'content-encoding', 'content-length', 'connection'].includes(key)) return;
    out[k] = v;
  });
  return out;
}

async function proxy(req: NextRequest, params: { path?: string[] } = {}) {
  const backendBase = process.env.BACKEND_URL;
  if (!backendBase) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  // 1) essayer params.path (catch-all), sinon extraire depuis le pathname
  let path = (params.path || []).join('/');
  if (!path) {
    // req.nextUrl.pathname exemple: /api/proxy/furnitures/typeListe
    const pathname = req.nextUrl.pathname || '';
    path = pathname.replace(/^\/api\/proxy\/?/, ''); // => "furnitures/typeListe" ou ""
  }

  const query = req.nextUrl.search || '';
  const target = path ? `${backendBase.replace(/\/$/, '')}/${path}${query}` : `${backendBase.replace(/\/$/, '')}${query}`;

  console.log('[proxy] target=', target, 'method=', req.method);

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');

  let body: any = undefined;
  if (!['GET', 'HEAD'].includes(req.method || '')) {
    try {
      const buf = await req.arrayBuffer();
      if (buf && buf.byteLength) body = Buffer.from(buf);
    } catch (e) { body = undefined; }
  }

  try {
    const backendRes = await fetch(target, {
      method: req.method,
      headers,
      body,
      redirect: 'follow',
    });

    const filtered = filterResponseHeaders(backendRes.headers);
    const arr = await backendRes.arrayBuffer();
    return new NextResponse(Buffer.from(arr), {
      status: backendRes.status,
      headers: Object.fromEntries(Object.entries(filtered)),
    });
  } catch (err: any) {
    console.error('[proxy] error', err);
    return NextResponse.json({ error: 'Bad Gateway', details: err?.message || String(err) }, { status: 502 });
  }
}

export async function GET(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }
export async function POST(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }
export async function PUT(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }
export async function DELETE(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }
export async function PATCH(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }
export async function OPTIONS(req: NextRequest, ctx: { params: { path?: string[] } }) { return proxy(req, ctx.params); }