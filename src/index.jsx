import style from './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import pic from '@assets/timg.jpeg';
import App from '@src/App';
console.log('this is init -03.');
ReactDOM.render(<App />, document.getElementById('app'));
let img = new Image();
img.src = pic;

let root = document.getElementById("app");
root.append(img);
