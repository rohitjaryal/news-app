import { createApp } from 'vue';
import Vuetify from './includes/Vuetify.ts';
import App from './App.vue';
import router from './router';
import './style.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Vuetify);
app.mount('#app');
