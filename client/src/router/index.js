import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books';
import Farkle from '@/components/Farkle';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books,
    },
    {
      path: '/farkle',
      name: 'Farkle',
      component: Farkle,
    },
  ],
  mode: 'hash',
});
