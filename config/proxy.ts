/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/v1/lib': {
      // 要代理的地址
      target: 'http://127.0.0.1:6001',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/v1/lib/': {
      target: 'http://127.0.0.1:6001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/v1/lib/': {
      target: 'http://127.0.0.1:6001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
