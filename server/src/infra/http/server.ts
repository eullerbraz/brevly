import { fastify } from 'fastify';

const app = fastify();

app.get('/health', async () => {
  return { status: 'ok' };
});

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log(`HTTP server running on http://${HOST}:${PORT}`);
});
