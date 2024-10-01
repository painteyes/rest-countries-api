<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>

    <div class="flex-grow flex items-center justify-center bg-gray-50 w-full">
        <div class="w-full max-w-xl bg-white shadow-xl rounded-lg p-8 mb-[100px]">
            <h1 class="text-3xl font-semibold leading-tight text-gray-900 mb-6 text-center">
                Create an account
            </h1>
            <RegisterForm />
        </div>
    </div>
</template>
