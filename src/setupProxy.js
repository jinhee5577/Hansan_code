const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',   // /api로 시작하는 경로일 경우
    createProxyMiddleware({
      target: 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json',   // 요청 url 앞에 target을 붙여주기
      changeOrigin : true,
      pathRewrite: {
        '^/api': '',   // /api에 해당하는 url을 없애기
      },
    }),
  );
};