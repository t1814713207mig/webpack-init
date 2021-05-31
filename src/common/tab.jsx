import React, { Component } from 'react';
import { add } from './fun';

export default class Tab extends Component {
  componentDidMount() {
    // console.log('我是公用的');
  }

  render() {
    return (
      <div>
        this is tab
        {add(1, 3)}
      </div>
    );
  }
}
