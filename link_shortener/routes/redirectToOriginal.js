import ShortenedUrl from '../models/shortenedUrl.js';
import dotenv from 'dotenv';

dotenv.config();
const siteUrl = process.env.SITE_URL

const redirectToOriginalRoute = async (fastify, options) => {
  fastify.get('/r/:hash', async (request, reply) => {
    try {
      const { hash } = request.params;
      const fullShortenedUrl = `${siteUrl}/r/${hash}`;
      const record = await ShortenedUrl.findOne({ where: { shortenedUrl: fullShortenedUrl } });

      if (record) {
        reply.redirect(record.url);
      } else {
        return reply.status(404).send({ error: 'Shortened URL not found' });
      }

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch original URL' });
    }
  });
};

export default redirectToOriginalRoute;
