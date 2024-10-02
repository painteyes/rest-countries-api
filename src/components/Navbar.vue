<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from '../services/auth';
import { state } from '../store/store.js';

const router = useRouter();

const handleLogout = () => {
    auth.logout(router);
};
const isMenuOpen = ref(false);

</script>

<template>
    <nav class="bg-indigo-400 shadow-md">
        <div class="max-w-screen-xl h-full flex items-center justify-between mx-auto p-4">
            <!-- Logo -->
            <a href="/" class="flex items-center">
                <span class="text-2xl font-extrabold text-white">REST Countries API</span>
            </a>
            <!-- Burger Menu Icon -->
            <button
                @click="isMenuOpen = !isMenuOpen"
                class="inline-flex items-center p-2 text-white md:hidden"
                aria-label="Toggle menu"
                v-if="state.authenticated"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
            <!-- Desktop Menu -->
            <div v-if="state.authenticated" class="hidden md:flex md:space-x-6 items-center">
                <a href="/" class="text-white hover:underline">Home</a>
                <a href="/user/edit" class="text-white hover:underline">Profile</a>
                <button
                    @click="handleLogout"
                    class="bg-sky-400 hover:bg-sky-400 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div v-if="isMenuOpen && state.authenticated" class="md:hidden bg-indigo-500 p-2">
            <a href="/" class="block text-lg text-white font-semibold py-2 px-4 hover:bg-indigo-500">Home</a>
            <a href="/user/edit" class="block text-white text-lg font-semibold py-2 px-4 hover:bg-indigo-500">Profile</a>
            <button
                @click="handleLogout"
                class=" text-left bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-4 m-4 rounded-lg"
            >
                Logout
            </button>
        </div>
    </nav>
</template>
