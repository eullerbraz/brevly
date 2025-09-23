import fastifyCors from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { HttpCustomError } from './errors/http-custom-error';
import { healthCheckRoute } from './routes/health-check';
import { linksRoute } from './routes/links';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, _req, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    });
  }

  if (error instanceof HttpCustomError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  console.error(error);

  return res.status(500).send({ messsage: 'Internal server error.' });
});

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  openapi: {
    info: { title: 'Brev.ly API', version: '1.0.0' },
  },
  transform: jsonSchemaTransform,
});

app.register(scalarUI, {
  routePrefix: '/docs',
});

app.register(healthCheckRoute, { prefix: '/health' });

app.register(linksRoute, { prefix: '/links' });

app.listen({ port: PORT, host: HOST }).then(() => {
  console.log(`HTTP server running on http://${HOST}:${PORT}`);
});
