import Fastify from 'fastify';
import cors from '@fastify/cors'
import shortenRoute from '/app/routes/shorten.js';
import redirectToOriginalRoute from '/app/routes/redirectToOriginal.js';
import getShortenedUrlsRoute from '/app/routes/getShortenedUrls.js';
import getShortenedUrlsCountRoute from '/app/routes/getShortenedUrlsCount.js';
import sequelize from './models/db.js';
import ShortenedUrl from './models/shortenedUrl.js';

sequelize.sync({ alter: true });
export {sequelize}
const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
  credentials: true
});

fastify.register(shortenRoute);
fastify.register(redirectToOriginalRoute);
fastify.register(getShortenedUrlsRoute);
fastify.register(getShortenedUrlsCountRoute);

fastify.addHook('onClose', async (instance, done) => {
  await sequelize.close();
  done();
});

fastify.listen({ port: 8082, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
