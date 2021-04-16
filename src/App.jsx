import React, { Component } from 'react'
import axios from 'axios';
import Tab from '@src/common/tab';
import Head from '@src/common/Head';
export default class Home extends Component {
    componentDidMount() {
        axios.get('/api/info').then((res) => {
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                app
                <Tab />
                <Head />
            </div>
        )
    }
}
