var dealPatch = (function() {
  let allPatch;
  let index = 0;

  function walk(node) {
    let currentPatch = allPatch[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
      walk(child);
    })

    if (currentPatch) {
      doPatch(node, currentPatch);
    }
  }

  function doPatch(node, patchs) {
    patchs.forEach(patch => {
      switch (patch.type) {
        case 'ATTRS':
          for (let key in patch.attrs) {
            let value = patch.attrs[key];
            if (value) {
              setAttr(node, key, value);
            } else {
              node.removeAttribute(key);
            }
          }
          break;
        case 'TEXT':
          console.log(node, patch.text);
          node.textContent = patch.text;
          break;
        case 'REPLACE':
          let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) 
                        : document.createTextNode(patch.newNode);

          node.parentNode.replaceChild(newNode, node);
          break;
        case 'REMOVE':
          break;
        default:
          break;
      }
    })
  }

  function dealPatch(node, patchs) {
    allPatch = patchs;

    walk(node);
  }

  return dealPatch;
})();