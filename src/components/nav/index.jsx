import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import classnames from 'classnames';
import { SmileFilled } from '@ant-design/icons';
import './reducer';
import './index.less';

export default (props) => {
  const { navItem } = useSelector((state) => state.nav);
  const getItem = (list) => list.map((item) => {
    const {
      children, key, Icon, name, url,
    } = item;
    if (!children) {
      return <Menu.Item icon={Icon ? <Icon /> : <SmileFilled />} key={key}><Link to={url}>{name}</Link></Menu.Item>;
    }
    return <Menu.SubMenu icon={Icon ? <Icon /> : <SmileFilled />} key={key} title={name}>{getItem(children)}</Menu.SubMenu>;
  });
  return (
    <Menu
      {...props}
      className={classnames('nav')}
      mode="inline"
      theme="dark"
    >
      {getItem(navItem)}
    </Menu>
  );
};
