import ShortenedUrl from '../models/shortenedUrl.js';

const getShortenedUrlsRoute = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/shortenedUrls',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            urls: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string' },
                  shortenedUrl: { type: 'string' },
                  dateCreated: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        }
      }
    },
    handler: async (request, reply) => {
      try {
        const urls = await ShortenedUrl.findAll();
        return { urls };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch urls' });
      }
    }
  });
};

export default getShortenedUrlsRoute;
