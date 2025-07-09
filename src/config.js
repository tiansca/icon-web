export default {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:9527/' : 'https://auth.tiansc.top', // 后端接口地址
  cssUrl: process.env.NODE_ENV === 'development' ? '/api/' : '/api/',  // 生成的css文件地址
  authUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://gate.tiansc.top/'
}
