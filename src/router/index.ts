import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

const List = () => import('@/views/List.vue');
const Detail = () => import('@/views/Detail.vue');

const routes = [
  {
    name: 'list',
    path: '/list',
    component: List,
    props: (route) => {
      console.log('ssdss', route);
      return {
        query: route.query.q
      };
    },
    children: []
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'list' }
  }
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
}) as Router;

export default router;
