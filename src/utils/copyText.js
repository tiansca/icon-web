import {ElMessage } from 'element-plus'
const copy = (content) => {
  // console.log(content)
  const ele = document.createElement('textarea') // 创建一个input标签
  ele.value = content
  // ele.innerText = content
  ele.style.width = '100%'
  ele.style.height = '500px'
  document.body.appendChild(ele) // 将input添加到body
  ele.select() // 获取input的文本内容
  document.execCommand('copy') // 执行copy指令
  document.body.removeChild(ele) // 删除input标签
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
}
export default copy
