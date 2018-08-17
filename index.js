// let utils = require('./utils');

// let createElement = utils.createElement;
// let render = utils.render;


// ast解析为树，由createElement生成虚拟dom
let virtualDom = createElement('ul', {class: 'list'}, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
])

// vdom diff 创建patchs对象更新新的vdom

// let el = render(virtualDom);

// renderDom(el, document.documentElement);


//==================================

let virtualDom1 = createElement('ul', {class: 'list'}, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
])

let virtualDom2 = createElement('ul', {class: 'list-attr'}, [
  createElement('li', { class: 'item' }, ['1']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('div', { class: 'item' }, ['2'])
])

let el = render(virtualDom1);

let patchs = diff(virtualDom1, virtualDom2);

renderDom(el, document.documentElement);

dealPatch(el, patchs);


// renderDom(el, document.documentElement);

// index bug