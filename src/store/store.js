import { reactive } from 'vue';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from '../utility/storage';

// Global reactive state
export const state = reactive({
    user: null,
    authenticated: false,
});

// Set user and authentication state
export function setUser(user) {
    state.user = user;
    state.authenticated = true;
    saveUserToStorage(user); // Persist in localStorage
}

// Clear user and authentication state
export function clearUser() {
    state.user = null;
    state.authenticated = false;
    removeUserFromStorage(); // Remove from localStorage
}

// Initialize user state from localStorage 
export function initializeUser() {
    const user = getUserFromStorage();
    if (user) {
        state.user = user;
        state.authenticated = true;
    }
}