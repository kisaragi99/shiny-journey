import ShortenedUrl from '../models/shortenedUrl.js';

const getShortenedUrlsCountRoute = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/shortenedUrlsCount',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            count: { type: 'number' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      try {
        const count = await ShortenedUrl.count();
        return { count };
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Failed to fetch the count of urls' });
      }
    }
  });
};

export default getShortenedUrlsCountRoute;
