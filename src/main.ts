import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

app.use(createPinia()).use(ElementPlus).use(router).mount('#app')

