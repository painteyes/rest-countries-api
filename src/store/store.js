import { reactive } from 'vue';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from '../utility/storage';

// Reactive state shared across the application
export const state = reactive({
    user: null,
    authenticated: false, 
});

// Set user data and persist it in localStorage
export function setUser(user) {
    state.user = user;
    state.authenticated = true; 
    saveUserToStorage(user);
}

// Clear user data and remove it from localStorage
export function clearUser() {
    state.user = null;
    state.authenticated = false; 
    removeUserFromStorage();
}

// Initialize user state from localStorage
export function initializeUser() {
    const user = getUserFromStorage();
    if (user) {
        state.user = user;
        state.authenticated = true;
    }
}