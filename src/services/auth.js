import { setUser, clearUser } from '../store/store.js';
import { mockFetch } from '../api/fetch'; 

const auth = {
    // Function to handle login
    async login(credentials) {
        try {
            // Send a mock POST request to the login API
            const response = await mockFetch(`/api/login`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Parse the user data from the response
            const user = await response.json();

            setUser(user); // Store the user data

            return user;
        } catch (error) {
            console.error('Error during login:', error); // Log any errors
        }
    },

    // Function to handle logout
    async logout(router) {
        try {
            // Send a mock POST request to the logout API
            await mockFetch(`/api/logout`, { 
                method: 'POST',
            });
        } catch (error) {
            console.error('Error during logout:', error); // Log any errors
        } finally {
            clearUser(); // Clear the user data
            if (router) {
                router.push('/login'); // Redirect to the login page if a router is provided
            }
        }
    },
};

export default auth;
