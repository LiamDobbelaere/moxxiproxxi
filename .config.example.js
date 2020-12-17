const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  domains: {
    [process.env.HOST]: {
      vhosts: [process.env.HOST, 'www.' + process.env.HOST],
      proxies: [{
        path: '/streamlist/*',
        proxy: createProxyMiddleware({
          target: "http://localhost:3001",
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/streamlist/*': ''
          }
        })
      }]
    }
  }
};