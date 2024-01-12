import config from '@/config.js'
const insertJs = (val) => {
  const header = document.querySelector('head')
  for (const item of val) {
    const link = document.createElement('script')
    const tagAttrNameValue = `fonticon${item.name}`
    const fonticonLink = document.querySelector(`script[name="${tagAttrNameValue}"]`)
    if (fonticonLink) { // 如果已经存在，则删除标签
      fonticonLink.remove()
    }
    link.setAttribute('name', tagAttrNameValue)
    // link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/javascript')
    link.src = config.cssUrl + item.jsUrl + `?${Date.now()}`
    if (header) {
      header.append(link)
    }
  }
}
export default insertJs
