module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  // lintOnSave:false,
  // 我用的only，打包后小些
  productionSourceMap: false,
  devServer: {
    /* 自动打开浏览器 */
    /* 使用代理 */
    proxy: {
      '/api': {
        // 'target': 'https://api.tiansc.top/api/',
        'target': 'http://localhost:3013',
        'changeOrigin': true,
        // "secure": false,
        pathRewrite: { // 重命名
          '^/api': ''
        }
      }
    }
  }
}
