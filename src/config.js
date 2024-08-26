export default {
  baseUrl: process.env.NODE_ENV === 'development' ? '/api/' : '/api/', // 后端接口地址
  cssUrl: process.env.NODE_ENV === 'development' ? '/api/' : '/api/' // 生成的css文件地址
}
