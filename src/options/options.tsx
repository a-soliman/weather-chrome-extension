import React from 'react';
import ReactDom from 'react-dom';

const test = <p>Options page, Hello World!</p>;

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDom.render(test, root);
