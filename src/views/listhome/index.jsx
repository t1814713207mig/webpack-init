import React, { PureComponent } from 'react';
import Img from '@assets/imagemin.jpg';

export default class ListHome extends PureComponent {
  render() {
    console.log(Img);
    return (
      <div>
        ListHome
        <img alt="测试" src={Img} />
      </div>
    );
  }
}
