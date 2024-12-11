const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/realms',
    createProxyMiddleware({
      target: 'https://dev-sso.techberry.co.th',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/realms': '/realms'
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      }
    })
  );
};