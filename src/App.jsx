import React, { Component } from 'react';
import axios from 'axios';
import Tab from '@src/common/tab';
import Head from '@src/common/Head';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      operation: '',
    };
  }

  componentDidMount() {
    axios.get('/api/info').then((res) => {
      const { name, operation } = res.data;
      this.setState({ name, operation });
    });
  }

  render() {
    const { name, operation } = this.state;
    return (
      <div>
        app--
        {name}
        &nbsp;&nbsp;
        {operation}
        <Tab />
        <Head />
      </div>
    );
  }
}
