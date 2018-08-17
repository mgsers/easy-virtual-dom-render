// patchs {type: 'ATTRS', {class: 'list'}}
//        {type: 'REMOVE', index: xx}
//        {type: 'REPLACE', newNode: node}
//        {type: 'TEXT', text: 1}

var diff = (function() {
  const ATTRS = 'ATTRS';
  const TEXT = 'TEXT';
  const REMOVE = 'REMOVE';
  const REPLACE = 'REPLACE';
  let Index = 0;

  function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for (let key in oldAttrs) {
      if (oldAttrs[key] !== newAttrs[key]) {
        patch[key] = newAttrs[key];
      }
    }
    for (let key in newAttrs) {
      if (!oldAttrs.hasOwnProperty(key)) {
        patch[key] = newAttrs[key];
      }
    }
    return patch;
  }

  function diffChildren(oldChildren, newChildren, patchs) {
    oldChildren.forEach((child, idx) => {
      walk(child, newChildren[idx], ++Index, patchs);
    })
  }

  function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
  }

  function walk(oldNode, newNode, index, patchs) {
    let currentPatch = [];
    if (!newNode) {
      currentPatch.push({type: REMOVE, index})
    } else if (isString(oldNode) && isString(newNode)) {
      if (oldNode !== newNode) {
        currentPatch.push({type: TEXT, text: newNode});
      }
    } else if (oldNode.type === newNode.type) {
      let attrs = diffAttr(oldNode.props, newNode.props);
      if (Object.keys(attrs).length) {
        currentPatch.push({type: ATTRS, attrs});
      }

      diffChildren(oldNode.children, newNode.children, patchs);
    } else {
      currentPatch.push({type: REPLACE, newNode});
    }

    

    if (currentPatch.length) {
      patchs[index] = currentPatch;
    }

  }

  function diff(oldTree, newTree) {
    let patchs = {};
    let index = 0;

    walk(oldTree, newTree, index, patchs);

    return patchs;
  }


  return diff;
})();