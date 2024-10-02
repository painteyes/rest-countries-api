<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
    <div class="flex flex-col h-full pt-[70px]">
        <!-- Navbar -->
        <Navbar class="fixed w-full top-0 h-[70px] z-10"/>

        <!-- Main -->
        <div class="flex-grow flex w-full">
            <router-view />
        </div>

        <!-- Footer -->
        <footer class="bg-gray-200 text-dark text-center py-4 mt-auto">
            <p class="text-sm">
                REST Countries API &copy; {{ new Date().getFullYear() }}
            </p>
        </footer>
    </div>
</template>



