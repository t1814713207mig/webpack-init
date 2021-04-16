import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Nav from '@src/components/nav';
import Header from '@src/components/header';
import './index.less';
const { Sider, Content } = Layout;
export default ({ children, ...rest }) => {
    const { pathname } = useLocation();
    const { collapsed } = useSelector((state) => state.nav);
    return <Layout className={classnames('platform-layout')}>
        <Sider width="180" collapsible collapsed={collapsed} trigger={null}>
            <Nav />
        </Sider>
        <Layout className="site-layout">
            <Header />
            <Content className='platform_content site_layout_background'>
                {children}
            </Content>
        </Layout>
    </Layout>
}