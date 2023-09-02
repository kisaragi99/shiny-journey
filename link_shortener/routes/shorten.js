import ShortenedUrl from '../models/shortenedUrl.js';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();
const siteUrl = process.env.SITE_URL

const prependHttp = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const shortenRoute = async (fastify, options) => {
  fastify.post('/shorten', async (request, reply) => {
    try {
      let { url } = request.body;

      url = prependHttp(url);

      const hash = nanoid(6);
      const shortenedUrl = `${siteUrl}/r/${hash}`;

      await ShortenedUrl.create({ url, shortenedUrl, dateCreated: new Date() });

      return { shortenedUrl };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to shorten URL' });
    }
  });
};

export default shortenRoute;
