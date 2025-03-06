const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
/**
 * Vue CLI Webpack配置相关：https://cli.vuejs.org/zh/guide/webpack.html
 */
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg') // 设置规则
      .exclude.add(resolve('src/icons')) // 设置忽略范围
      .end() // 结束

    config.module
      .rule('icons') // 设置规则
      .test(/\.svg$/) // 设置解析 svg 格式文件
      .include.add(resolve('src/icons')) // 设置解析的文件范围
      .end() // 结束
      .use('svg-sprite-loader') // 新增了一个解析的loader
      .loader('svg-sprite-loader') // 具体使用的loader
      .options({
        // loader 的具体配置
        symbolId: 'icon-[name]'
      })
      .end() // 结束
  }
})
