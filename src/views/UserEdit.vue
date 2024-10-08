<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'; 
import { state, setUser } from '../store/store.js';
import { navigateBackOrHome } from '../router/navigation.js';

const router = useRouter(); 

// Create a reactive copy of the user state
const user = reactive({ ...state.user });

// Function to update user data 
const updateUser = () => {
    setUser(user); // Update the user state
    navigateBackOrHome(router); // Navigate back or to homepage
};
</script>

<template>
    <div class="flex-grow flex items-center justify-center bg-gray-50 w-full">
        <div class="w-full max-w-xl lg:bg-white lg:shadow-xl rounded-lg p-8 mb-[100px]">
            <!-- Header -->
            <h1 class="text-3xl font-semibold leading-tight text-gray-900 mb-6 text-center">
                Edit Profile
            </h1>

            <!-- Form -->
            <form @submit.prevent="updateUser" class="space-y-6">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-lg font-medium text-gray-700 mb-2">Name</label>
                    <input
                        v-model="user.name"
                        type="text"
                        id="name"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        required
                    />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-lg font-medium text-gray-700 mb-2">Email</label>
                    <input
                        v-model="user.email"
                        type="email"
                        id="email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        required
                    />
                </div>

                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-lg font-medium text-gray-700 mb-2">Phone</label>
                    <input
                        v-model="user.phone"
                        type="tel"
                        id="phone"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                    />
                </div>

                <!-- Save Button -->
                <button
                    type="submit"
                    class="w-full py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
                >
                    Save Changes
                </button>
            </form>
        </div>
    </div>
</template>


<style scoped>
/* Scrollbar styling */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

div.overflow-x-auto {
    max-width: 100%; 
    white-space: nowrap;
    overflow-y: hidden; 
    display: flex;
    align-items: center;
    padding-right: 4px; 
}

/* Resize the flag image */
img {
    height: 20px;
}
</style>
