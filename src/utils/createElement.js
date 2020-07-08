function createElement (tag, classname) {
  const ele = document.createElement(tag)
  if (classname instanceof Array) {
    classname.forEach(name=>{
      // ele.classList.add(name)
    })
  } else {
    // ele.classList.add(name)
  }
  return ele
}

module.exports = createElement