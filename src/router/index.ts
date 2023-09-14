import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
// import List from '../views/List.vue';
// import Detail from '../views/Detail.vue';

const List = () => import('@/views/List.vue');
const Detail = () => import('@/views/Detail.vue');

const routes = [
  {
    name: 'list',
    path: '/list',
    component: List
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

// router.beforeEach((to, from, next) => {
//   if (!to.meta.authRequired) {
//     next();
//     return;
//   }
//   useUserStore().userLoggedIn ? next() : next({ name: 'home' });
// });

export default router;
