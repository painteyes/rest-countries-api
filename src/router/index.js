// Imports
import { createRouter, createWebHashHistory } from 'vue-router';
import { usePreviousRoute } from '../composables/usePreviousRoute';
import { state } from '../store/store.js';

// Component Imports
import Dashboard from '../views/Dashboard.vue'; 
import Login from '../views/Login.vue'; 
import UserEdit from '../views/UserEdit.vue'; 
import NotFound from '../views/NotFound.vue';

// Route Definitions
const routes = [
    { path: '/', name: 'home', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/user/edit', name: 'userEdit', component: UserEdit },
    { path: '/:catchAll(.*)', name: 'notFound', component: NotFound }, 
];

// Create Router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Route Guard: Authentication Check
function checkAuthentication(to, next) {
    if (!state.authenticated && to.name !== 'login') {
        next('/login');
    } else if (state.authenticated && to.name === 'login') {
        next('/dashboard');
    } else {
        next();
    }
}

// Route Guard: Track Previous Route
function trackPreviousRoute(from) {
    const { previousRoute } = usePreviousRoute();
    previousRoute.value = from;
}

// Global Navigation Guard
router.beforeEach((to, from, next) => {
    checkAuthentication(to, next);
    trackPreviousRoute(from);
});

export default router;
