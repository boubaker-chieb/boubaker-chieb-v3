import { kv } from '@vercel/kv';

const DEFAULT_LIKES = 3248;

async function getCurrentCount(): Promise<number> {
  const hasKv = Boolean(process.env.KV_URL || process.env.KV_REST_API_URL);

  if (!hasKv) {
    return DEFAULT_LIKES;
  }

  try {
    const current = await kv.get<number>('site-likes');

    if (typeof current === 'number' && Number.isFinite(current)) {
      return current;
    }

    await kv.set('site-likes', DEFAULT_LIKES);
    return DEFAULT_LIKES;
  } catch {
    return DEFAULT_LIKES;
  }
}

async function incrementCount(): Promise<number> {
  const hasKv = Boolean(process.env.KV_URL || process.env.KV_REST_API_URL);

  if (!hasKv) {
    return DEFAULT_LIKES;
  }

  try {
    const current = await kv.get<number>('site-likes');

    if (typeof current !== 'number' || !Number.isFinite(current)) {
      await kv.set('site-likes', DEFAULT_LIKES);
      return DEFAULT_LIKES + 1;
    }

    const next = current + 1;
    await kv.set('site-likes', next);
    return next;
  } catch {
    return DEFAULT_LIKES;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const count = await getCurrentCount();
    return res.status(200).json({ count, success: true });
  }

  if (req.method === 'POST') {
    const count = await incrementCount();
    return res.status(200).json({ count, success: true });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
