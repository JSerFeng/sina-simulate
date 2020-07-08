class Vdom {
  constructor (type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}
function createElement (type, props, children=undefined) {
  return new Vdom(type, props, children)
}
function render (vdom) {
  if (!vdom) {
    return document.createTextNode('')
  }
  const el = document.createElement(vdom.type)
  if (vdom.props) {
    for (let key in vdom.props) {
      setAttr(el, key, vdom.props[key])
    }
  }
  if (typeof vdom.children == 'string' || typeof vdom.children == 'number') {
    el.appendChild(document.createTextNode(vdom.children))
  } else if (typeof vdom.children != 'undefined') {
    vdom.children.forEach(child=>{
      el.appendChild(render(child))
    })
  }
  
  return el
}
function setAttr (node, key, value) {
  if (key == 'value' && (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea')) {
    node.value = value
  } else if (key == 'style') {
    node.style.cssText = value
  } else {
    node.setAttribute(key, value)    
  }
}
function mount (node, target) {
  target.appendChild(node)
}
export {
  Vdom,
  createElement,
  render,
  setAttr,
  mount
}