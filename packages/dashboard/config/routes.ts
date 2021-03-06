﻿import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
        ],
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
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'post',
    icon: 'form',
    path: '/post',
    routes: [
      {
        name: 'list',
        path: '/post/list',
        component: './Post',
      },
      {
        name: 'category',
        path: '/post/category',
        component: './Category',
      },
      {
        name: 'tag',
        path: '/post/tag',
        component: './Tag',
      },
    ],
  },

  {
    path: '/editor',
    component: './Editor',
    layout: false,
  },
  {
    path: '/editor/:id',
    component: './Editor',
    layout: false,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

export default routes;
