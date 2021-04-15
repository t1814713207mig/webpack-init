import style from './style.less';
import React from 'react';
import ReactDOM from 'react-dom';
import pic from '@assets/timg.jpeg';
import Home from '@src/components/Home';
console.log('this is init -03.');
ReactDOM.render(<Home />, document.getElementById('app'));
let img = new Image();
img.src = pic;

let root = document.getElementById("app");
root.append(img);
