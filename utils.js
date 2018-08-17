class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'TEXTAREA' ||
          node.tagName.toUpperCase() === 'INPUT') {
            node.value = value;
          } else {
            node.setAttribute(key, value);
          }

      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key,value);
      break;
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function render(vdom) {
  let el = document.createElement(vdom.type);
  
  for (let key in vdom.props) {
    // 区分普通属性 表单动态属性 行内属性等
    setAttr(el, key, vdom.props[key]);
  }

  vdom.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  })

  return el;
}

function renderDom(el, target) {
  target.appendChild(el);
}



// module.exports =  {
//   createElement,
//   render
// }