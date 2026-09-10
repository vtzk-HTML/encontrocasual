import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  const { resposta } = req.body || {};

  if (resposta !== 'sim' && resposta !== 'nao') {
    res.status(400).json({ error: 'Resposta inválida' });
    return;
  }

  const registro = {
    resposta,
    data: new Date().toISOString(),
  };

  try {
    await redis.lpush('respostas', JSON.stringify(registro));
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Falha ao gravar no banco' });
  }
}
