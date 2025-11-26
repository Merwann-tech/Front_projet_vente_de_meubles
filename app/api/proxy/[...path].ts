export default async function handler(req: { query: { path: any[]; }; url: string; headers: any; method: string; body: BodyInit | null | undefined; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; details?: any; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer<ArrayBuffer>) => void; }) {
  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : (req.query.path || '');
  const backendBase = process.env.BACKEND_URL; // définir dans Vercel Dashboard
  if (!backendBase) {
    return res.status(500).json({ error: 'BACKEND_URL not configured' });
  }

  // Construire l'URL cible en préservant la querystring
  const queryString = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
  const targetUrl = `${backendBase.replace(/\/$/, '')}/${path}${queryString}`;

  // Préparer les headers à transférer (supprimer host pour éviter conflits)
  const headers = { ...req.headers };
  delete headers.host;

  try {
    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      // body : null pour GET/HEAD
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
    });

    // Propager status et headers (quelques headers sensibles peuvent être filtrés si besoin)
    res.status(backendRes.status);
    backendRes.headers.forEach((v, k) => {
      // Éviter d'écraser certains headers côté Vercel si nécessaire
      res.setHeader(k, v);
    });

    const buffer = Buffer.from(await backendRes.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error('Proxy error:', err);
    const message = (err instanceof Error) ? err.message : String(err);
    res.status(502).json({ error: 'Bad Gateway', details: message });
  }
}