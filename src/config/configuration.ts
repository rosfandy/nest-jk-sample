export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default-secret',
  },
});
