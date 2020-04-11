module.exports = (app) => {
  app.get(
    '/healthcheck',
    async (req, res, next) => {
      try {
        await app.get('db').query('SELECT 1');

        return res.json({ message: 'API is healthy' });
      } catch (error) {
        return next(error);
      }
    },
  );
};
