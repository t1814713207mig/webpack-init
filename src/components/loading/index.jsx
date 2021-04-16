import React from 'react';
import { Spin } from 'antd';
import './index.less';

export default () => (
    <div className="loading">
        <Spin size="large" tip="加载中..." />
    </div>
);
