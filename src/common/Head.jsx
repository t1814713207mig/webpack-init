import React, { Component } from 'react';
export default class Tab extends Component {
    componentDidMount() { 
        console.log('我是公用的');
    }
    render() {
        return (
            <div>
                this is head
            </div>
        )
    }
}
