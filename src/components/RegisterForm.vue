<script setup>
import { ref } from 'vue';
import auth from '../services/auth'; 
import { useRouter } from 'vue-router';
import { mockFetch } from '../api/fetch'; 

const router = useRouter();

// Reactive references for form input fields
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// Register function triggered on form submission
const register = async () => {
    // Check if password and confirmPassword match
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match';
        return;
    }

    try {
        // Creating a new user object
        const newUser = { username: username.value, password: password.value };

        // Mock API request to register the user
        const response = await mockFetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });

        // If the response is not successful, throw an error
        if (!response.ok) {
            throw new Error('Registration failed');
        }

        // Parse the response data
        const user = await response.json();
        
        // Automatically log in the user after successful registration
        await auth.login({ username: user.email, password: newUser.password });

        // Redirect to the dashboard
        router.push('/dashboard');
    } catch (error) {
        // Handle registration error
        console.error('Registration failed', error);
    }
};
</script>

<template>
    <form @submit.prevent="register" class="space-y-6">
        <!-- Email Field -->
        <div class="mb-6">
            <label for="email" class="block text-lg font-medium text-gray-700 mb-2">Your email</label>
            <input
                type="email"
                name="email"
                id="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="name@company.com"
                required
                v-model="username"
            />
        </div>

        <!-- Password Field -->
        <div class="mb-6">
            <label for="password" class="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                required
            />
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
            <label for="confirm-password" class="block text-lg font-medium text-gray-700 mb-2">Confirm password</label>
            <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                required
            />
        </div>

        <!-- Error Message for validation -->
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <!-- Terms and Conditions Checkbox -->
        <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
                <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                />
            </div>
            <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500">
                    I accept the
                    <a class="font-medium text-blue-600 hover:underline" href="#">
                        Terms and Conditions
                    </a>
                </label>
            </div>
        </div>

        <!-- Register Button -->
        <button
            type="submit"
            class="w-full py-3 px-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
        >
            Create an account
        </button>

        <!-- Login Message -->
        <p class="text-sm font-light text-gray-500 mt-6">
            Already have an account?
            <a href="#" class="font-medium text-blue-600 hover:underline">Login here</a>
        </p>
    </form>
</template>

