<script setup>
import { useRouter } from 'vue-router';
import auth from '../services/auth';
import { state } from '../store/store.js';

const router = useRouter();

const handleLogout = () => {
    auth.logout(router);
};
</script>

<template>
    <nav class="bg-blue-900 shadow-md">
        <div class="max-w-screen-xl h-full flex items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center">
                <span class="text-2xl font-extrabold dark:text-white">REST Countries API</span>
            </a>
            <div v-if="state.authenticated" class="hidden md:flex md:space-x-6 items-center">
                <a href="/" class="text-gray-900 dark:text-white hover:underline">Home</a>
                <a href="/user/edit" class="text-gray-900 dark:text-white hover:underline">Profile</a>
                <button @click="handleLogout" class="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg">Logout</button>
            </div>
        </div>
    </nav>
</template>

