import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import styles from './index.less';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
export default () => {
    const { collapsed } = useSelector((state) => state.nav);
    const dispatch = useDispatch();
    const collclick = useCallback(() => {
        dispatch({ type: 'nav/switch', collapsed: !collapsed })
    }, [collapsed]);
    return (
        <Header className={classnames('platform_header')} style={{ padding: '0 15px' }}>
            {collapsed ? <MenuUnfoldOutlined onClick={collclick} /> : <MenuFoldOutlined onClick={collclick} />}
        </Header>
    )
}