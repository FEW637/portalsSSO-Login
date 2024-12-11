const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://dev-sso.techberry.co.th',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/auth': ''
      }
    })
  );
};