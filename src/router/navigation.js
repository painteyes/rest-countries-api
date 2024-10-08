import { usePreviousRoute } from '../composables/usePreviousRoute.js';

/**
 * Navigates back to the previous page within the app or redirects to the homepage.
 * 
 * If the previous route is valid within the app's defined routes, it goes back using `router.go(-1)`. 
 * If the previous route is the root ('/') or undefined (e.g., when accessed via a direct URL), 
 * it redirects to the homepage.
*/
export function navigateBackOrHome(router) {
    const { previousRoute } = usePreviousRoute();

    if (!previousRoute.value || previousRoute.value.path === '/' || previousRoute.value.name === 'notFound') {
        router.push({ name: 'home' });
    } else if (router.getRoutes().some(route => route.path === previousRoute.value.path)) {
        router.go(-1);
    } else {
        router.push({ name: 'home' });
    }
}
