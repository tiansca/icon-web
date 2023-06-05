export default {
  baseUrl: process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.tiansc.top/api/icon/', // 接口地址
  cssUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3013/' : 'https://api.tiansc.top/icon_css/' // 生成的css文件地址
}
