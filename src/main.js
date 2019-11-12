import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Demo1 from './view/demo-1.vue';
import Demo2 from './view/demo-2.vue';

const routes = [
  { path: '/', component: App },
  { path: '/demo-1', component: Demo1 },
  { path: '/demo-2', component: Demo2 }
]
const router = new VueRouter({
  routes
})
Vue.use(VueRouter);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
