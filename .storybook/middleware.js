const proxy = require('http-proxy-middleware')
//add proxy
module.exports = function expressMiddleware(router) {
  router.use(
    '/mock',
    proxy({
      target: 'http://yapi.deepexi.io:5002',
      changeOrigin: true
    })
  )
}
