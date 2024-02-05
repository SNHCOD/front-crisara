// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { pinia } from './store';
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import '@/assets/styles/index.css'
import '@/assets/styles/toastification.css'

const app = createApp(App);

app.use(router);

app.use(pinia);

app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: POSITION.TOP_CENTER
  });

app.mount('#app');
