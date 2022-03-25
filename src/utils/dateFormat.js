const num = (n) => {
  if (!n && n !== 0) {
    return '-'
  }
  if (n < 10) {
    return '0' + n
  }
  return n
}
const dateFormat = (date, showTime) => {
  if (!date) {
    return ''
  }
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const myDate = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (showTime) {
    // 时分秒
    return `${year}-${num(month)}-${num(myDate)} ${num(hour)}:${num(minute)}:${num(second)}`
  }
  return `${year}-${num(month)}-${num(myDate)}`
}
export default dateFormat
