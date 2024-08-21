export default {
  baseUrl: process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.tiansc.top/api/icon/', // 后端接口地址
  cssUrl: process.env.NODE_ENV === 'development' ? '/api/' : 'https://api.tiansc.top/api/icon/' // 生成的css文件地址
}
