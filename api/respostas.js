import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { secret } = req.query;

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Não autorizado' });
    return;
  }

  try {
    const bruto = await kv.lrange('respostas', 0, -1);
    const respostas = bruto.map((item) =>
      typeof item === 'string' ? JSON.parse(item) : item
    );
    res.status(200).json({ respostas });
  } catch (err) {
    res.status(500).json({ error: 'Falha ao ler o banco' });
  }
}
