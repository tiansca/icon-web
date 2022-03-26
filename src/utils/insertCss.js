import config from '@/config.js'
const insertCss = (val) => {
  const header = document.querySelector('head')
  // const fonticonLink = document.querySelectorAll('link[name="fonticon"]')
  // for (let a = 0; a < fonticonLink.length; a++) {
  //   fonticonLink[a].remove()
  // }
  for (const item of val) {
    console.log('item', item)
    const link = document.createElement('link')
    const tagAttrNameValue = `fonticon${item.name}`
    const fonticonLink = document.querySelector(`link[name="${tagAttrNameValue}"]`)
    if (fonticonLink) {
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
