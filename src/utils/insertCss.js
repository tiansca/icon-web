import config from '@/config.js'
const insertCss = (val) => {
  const header = document.querySelector('head')
  for (const item of val) {
    const link = document.createElement('link')
    const tagAttrNameValue = `fonticon${item.name}`
    const fonticonLink = document.querySelector(`link[name="${tagAttrNameValue}"]`)
    if (fonticonLink) { // 如果已经存在，则删除标签
      fonticonLink.remove()
    }
    link.setAttribute('name', tagAttrNameValue)
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.href = config.cssUrl + item.cssUrl + `?${Date.now()}`
    if (header) {
      header.append(link)
    }
  }
}
export default insertCss
