const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  },
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8084',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/vue-activiti'
        }
      }
    }
  },
};
