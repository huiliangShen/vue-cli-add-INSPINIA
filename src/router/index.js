import Layout from '../components/layout.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const otherRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => {
    require(['../components/login/login.vue'], resolve);
  }
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/index',
    name: 'index',
    title: '主页',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'user-center'
      },
      {
        path: 'user-center',
        title: '用户中心',
        name: 'user-center',
        component: resolve => {
          require(['../components/home/user-center.vue'], resolve);
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    title: '主页',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'role-manage'
      },
      {
        path: 'role-manage',
        title: '用户中心',
        name: 'role-manage',
        component: resolve => {
          require(['../components/system/role-manage.vue'], resolve);
        }
      }
    ]
  },
  {
    path: '/SystemAccount',
    name: 'SystemAccount',
    title: '主页',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'List'
      },
      {
        path: 'List',
        title: 'Test',
        name: 'List',
        component: resolve => {
          require(['../components/SystemAccount/List.vue'], resolve);
        }
      }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
    ...appRouter
];
