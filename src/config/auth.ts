export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '7d',
    secretRefreshTK: 'd3vr4d4rzeraf10p4d0raut8',
    expiresInRefreshTK: '7d',
    expiresInRefreshTKDays: 1,
  },
};
