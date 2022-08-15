export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
  {
    name: 'merchantandstore',
    icon: 'table',
    path: '/merchant',
    //   component: './Merchant/Users/Users',
    routes: [
      {
        name: 'addmerchant',
        icon: 'table',
        path: '/merchant/add',
        component: './Merchant/Add/Add',
      },
      {
        name: 'list',
        icon: 'table',
        path: '/merchant/list',
        component: './Merchant/List/List',
      },
      {
        name: 'adduser',
        icon: 'table',
        path: '/merchant/adduser',
        component: './Merchant/AddUser/AddUser',
      },
      {
        name: 'users',
        icon: 'table',
        path: '/merchant/users',
        component: './Merchant/Users/Users',
      },
      {
        name: 'addstore',
        icon: 'table',
        path: '/merchant/addstore',
        component: './Merchant/AddStore/AddStore',
      },
      {
        name: 'stores',
        icon: 'table',
        path: '/merchant/stores',
        component: './Merchant/Stores/Stores',
      },
      {
        name: 'addlanguage',
        icon: 'table',
        path: '/merchant/addlanguage',
        component: './Merchant/AddLanguage/AddLanguage',
      },
      {
        name: 'languages',
        icon: 'table',
        path: '/merchant/languages',
        component: './Merchant/Languages/Languages',
      },
    ],
  },
];
