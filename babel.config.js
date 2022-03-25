let transformRemoveConsolePlugin = [];
// 生产环境清除console.log的信息
if (process.env.NODE_ENV === "production") {
  transformRemoveConsolePlugin = ["transform-remove-console"];
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...transformRemoveConsolePlugin
  ]
}
