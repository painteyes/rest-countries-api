<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
    <div class="flex flex-col h-full pt-[70px]">
        <!-- Navbar -->
        <Navbar class="fixed w-full top-0 h-[70px] z-10	"/>

        <!-- Main -->
        <div class="flex-grow flex w-full">
            <router-view />
        </div>
    </div>
</template>




