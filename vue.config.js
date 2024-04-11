const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // 注意target后面不应该有空格
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
})
