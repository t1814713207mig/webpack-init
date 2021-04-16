import { addReducer } from '@src/redux';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
const initState = {
    collapsed: false,
    navItem: [
        { key: 1, parentId: null,Icon:UserOutlined, name: 'listhome', url:'/list/listhome' },
        { key: 2, parentId: null,Icon:UploadOutlined, name: 'subnav1', url:'/list/subnav1' },
    ]
};
const nav = (state = initState, { type, ...values }) => {
    switch (type) {
        case 'nav/switch':
            return {
                ...state,
                ...values
            };
        default:
            return state;
    }
};
addReducer({ nav });