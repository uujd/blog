const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  base: './'
})
const webpack = require("webpack")
module.exports = {
  publicPath:"./",
  devServer: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:81",
        changeOrigin: true, 
        pathRewrite: {
          '/api': ''
        }
      },
    },
      client: {
        //当出现编译错误或警告时，在浏览器中是否显示全屏覆盖。  示例为只显示错误信息
        overlay: {
          errors: false,
          warnings: false
        },
      },   
  },

  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'axios': 'axios',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
    }
  },
}
