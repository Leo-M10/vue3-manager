// 暴露常量路由规则
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'//命名路由
    },
    {
        path: '/404',
        component: () => import('@/views/login/index.vue'),
        name: '404'
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/index.vue'),
        name: '',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'Avatar'
                }
            },
        ]
    },
    {
        path: '/system',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '系统管理',
            hidden: false,
        },
        children: [
            {
                path: '/system/sysUser',
                component: () => import('@/views/system/user/index.vue'),
                name: 'user',
                meta: {
                    title: '用户管理',
                    hidden: false,
                }
            },
            {
                path: '/system/sysMenu',
                component: () => import('@/views/system/menu/index.vue'),
                name: 'menu',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                }
            },
            {
                path: '/system/sysRole',
                component: () => import('@/views/system/role/index.vue'),
                name: 'role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                }
            },
            {
                path: '/system/sysOrg',
                component: () => import('@/views/system/org/index.vue'),
                name: 'org',
                meta: {
                    title: '组织管理',
                    hidden: false,
                }
            }
        ]
    }
]