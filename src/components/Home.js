import React, { Component } from 'react'
import axios from 'axios';
export default class Home extends Component {
    componentDidMount() { 
        axios.get('/api/info').then((res) => { 
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}
