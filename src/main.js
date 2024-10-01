import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeUser } from './store/store.js'; 
import router from './router/index.js'; 

const app = createApp(App);

initializeUser(); // Initialize user state from localStorage

app.use(router); 

app.mount('#app'); 
