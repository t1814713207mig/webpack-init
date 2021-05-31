import React from 'react';
import ReactDOM from 'react-dom';
import pic from '@assets/timg.jpeg';
import App from '@src/App';
import './style.less';

// console.log('this is init -03.');
ReactDOM.render(<App />, document.getElementById('app'));
const img = new Image();
img.src = pic;

const root = document.getElementById('app');
root.append(img);
