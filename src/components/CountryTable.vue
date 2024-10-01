<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    countries: {
        type: Array,
        required: true,
    },
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Total number of pages
const totalPages = computed(() => {
    return Math.ceil(props.countries.length / itemsPerPage);
});

// Paginate the countries data
const paginatedCountries = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return props.countries.slice(start, end);
});

// Methods to change pages
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};
</script>

<template>
    <div class="overflow-x-auto relative">
        <table class="min-w-full table-auto border-collapse border-spacing-4 bg-white rounded-lg overflow-hidden">
            <!-- Table Header -->
            <thead class="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                    <th class="text-center w-24 p-3">Flag</th>
                    <th class="text-left w-40 p-3">Country Name</th>
                    <th class="text-center w-32 p-3">Country Code</th>
                    <th class="text-left w-32 p-3">Region</th>
                    <th class="text-left w-40 p-3">Subregion</th>
                    <th class="text-left w-48 p-3">Currencies</th>
                    <th class="text-left w-40 p-3">Capital</th>
                    <th class="text-left w-32 p-3">Population</th>
                </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="text-gray-600 divide-y divide-gray-200">
                <tr
                    v-for="country in paginatedCountries"
                    :key="country.code"
                    class="hover:bg-gray-100 transition-colors h-[5rem]"
                >
                    <!-- Country Flag -->
                    <td class="w-24 max-w-24 p-3">
                        <div class="flex items-center justify-center">
                            <img
                                v-if="country.flag"
                                :src="country.flag"
                                alt="Flag"
                                class="h-10 w-auto shadow-md block"
                            />
                        </div>
                    </td>

                    <!-- Country Name -->
                    <td class="w-40 max-w-40 p-3">
                        <div class="overflow-x-auto">{{ country.name }}</div>
                    </td>

                    <!-- Country Code -->
                    <td class="w-32 max-w-32 p-3 text-center">
                        <div class="flex items-center justify-center overflow-x-auto">{{ country.code }}</div>
                    </td>

                    <!-- Region -->
                    <td class="w-32 max-w-32 p-3">
                        <div class="h-full flex items-center overflow-x-auto">{{ country.region }}</div>
                    </td>

                    <!-- Subregion -->
                    <td class="w-40 max-w-40 p-3">
                        <div class="overflow-x-auto">{{ country.subregion }}</div>
                    </td>

                    <!-- Currencies -->
                    <td class="w-48 max-w-48 p-3">
                        <div class="overflow-x-auto">{{ country.currencies }}</div>
                    </td>

                    <!-- Capital -->
                    <td class="w-40 max-w-40 p-3">
                        <div class="overflow-x-auto">{{ country.capital }}</div>
                    </td>

                    <!-- Population -->
                    <td class="w-32 max-w-32 p-3">
                        <div class="overflow-x-auto">{{ country.population }}</div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="mt-6 flex justify-between items-center">
            <button
                class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="prevPage"
            >
                Previous
            </button>
            <span class="text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
            <button
                class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="nextPage"
            >
                Next
            </button>
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
    padding-bottom: 10px;
    padding-top: 10px;
}

img {
    height: 20px;
}
</style>
