import Vue from 'vue';
import Router from 'vue-router';
import Farkle from '@/components/Farkle';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/farkle',
      name: 'Farkle',
      component: Farkle,
    },
  ],
  mode: 'hash',
});
