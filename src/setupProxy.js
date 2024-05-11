const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://e9d9-102-89-23-53.ngrok-free.app/api/admin/sign-in',
      changeOrigin: true,
    })
  );
};