export default [
    {
        key: 'list',
        loader: () => import(/*webpackChunkName:"listhome"*/'@src/views/listhome'),
        path: '/list',
    },
    {
        key: 'listhome',
        loader: () => import(/*webpackChunkName:"listhome"*/'@src/views/listhome'),
        path: '/list/listhome',
    },
    {
        key: 'subnav1',
        loader: () => import(/*webpackChunkName:"subnav1"*/'@src/views/subnav1'),
        path: '/list/subnav1',
    }
]