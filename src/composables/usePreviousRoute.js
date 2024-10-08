import { ref } from 'vue';

const previousRoute = ref(null);

export function usePreviousRoute() {
    return {
        previousRoute,
    };
}
