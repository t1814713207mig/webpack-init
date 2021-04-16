export default [
    {
        key: 'list',
        loader: () => import('@src/views/listhome'),
        path: '/list',
    },
    {
        key: 'listhome',
        loader: () => import('@src/views/listhome'),
        path: '/list/listhome',
    },
    {
        key: 'subnav1',
        loader: () => import('@src/views/subnav1'),
        path: '/list/subnav1',
    }
]