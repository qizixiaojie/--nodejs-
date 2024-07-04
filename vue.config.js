const { defineConfig } = require('@vue/cli-service')
require('events').EventEmitter.defaultMaxListeners = 20; // 将MaxListeners的限制数增加到20

require('events').EventEmitter.defaultMaxListeners = 0; // 解除限制
module.exports = defineConfig({
  transpileDependencies: true,
  //配置代理，目的，将自己创建的服务器，使用，防止跨域问题
  devServer: {
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
