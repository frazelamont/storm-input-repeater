export const h = vNode => {
    let node = document.createElement(vNode.type);
    for(let key in vNode.attributes) {
        if(key.substr(0, 2) === 'on') node.addEventListener(key.substr(2).toLowerCase(), vNode.attributes[key]);
        else node.setAttribute(key, vNode.attributes[key]);
    }
    
    if(vNode.text) node.appendchild(document.createTextNode(vNode.text));
    if(vNode.innerHTML) node.innerHTML = vNode.innerHTML;
    

    vNode.children && vNode.children.forEach(child => {
        if(child.nodeName) node.appendChild(child);
        else node.appendChild(h(child));
    });

    return node;
};

export const updateAttributes = (node, attributes) => {
    for(let key in attributes) node.setAttribute(key, attributes[key]);
    return node;
};

export const clonesFromDOM = nodes => nodes.map(node => ({
        container: node,
        input: node.firstElementChild,
        button: node.lastElementChild
    }));