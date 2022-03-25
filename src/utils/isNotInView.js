const isElementNotInViewport = function(el, offset = 0) {
  // console.log(el)
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= (window.innerHeight || document.documentElement.clientHeight) + offset ||
    rect.bottom <= 0 - offset
  )
}

export default isElementNotInViewport
