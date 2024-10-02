import { createRouter, createWebHashHistory } from 'vue-router';
import { state } from '../store/store.js';
import Dashboard from '../views/Dashboard.vue'; 
import Login from '../views/Login.vue'; 
import UserEdit from '../views/UserEdit.vue'; 
import NotFound from '../views/NotFound.vue';

const routes = [
    { path: '/', name: 'home', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/user/edit', name: 'userEdit', component: UserEdit },
    { path: '/:catchAll(.*)', name: 'notFound', component: NotFound }, 
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (!state.authenticated && to.name !== "login") {
        next('/login');
    } else if (state.authenticated && to.name === "login") {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;

