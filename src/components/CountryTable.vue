<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
    countries: {
        type: Array,
        required: true,
    },
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Sorting state
const sortColumn = ref('');
const sortDirection = ref('');

// Search query state
const searchQuery = ref('');

// Total number of pages
const totalPages = computed(() => {
    return Math.ceil(filteredCountries.value.length / itemsPerPage);
});

const filteredCountries = computed(() => {
    if (!searchQuery.value) return props.countries;
    return props.countries.filter((country) => {
        return (
            country.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            country.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            country.region.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            country.subregion.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            country.currencies.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            country.capital.toLowerCase().includes(searchQuery.value.toLowerCase()) 
        );
    });
});

const sortedCountries = computed(() => {
    const countriesCopy = [...filteredCountries.value];
    if (sortColumn.value) {
        countriesCopy.sort((a, b) => {
            const aValue = a[sortColumn.value];
            const bValue = b[sortColumn.value];

            if (aValue === bValue) return 0;

            const direction = sortDirection.value === 'asc' ? 1 : -1;
            return aValue > bValue ? direction : -direction;
        });
    }
    return countriesCopy;
});

const paginatedCountries = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedCountries.value.slice(start, end);
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

const setSorting = (column) => {
    if (sortColumn.value === column) {
        if (sortDirection.value === 'asc') {
            sortDirection.value = 'desc';
        } else if (sortDirection.value === 'desc') {
            sortDirection.value = ''; 
            sortColumn.value = ''; 
        } else {
            sortDirection.value = 'asc'; 
        }
    } else {
        sortColumn.value = column;
        sortDirection.value = 'asc'; // Default to ascending when a new column is selected
    }
    currentPage.value = 1; // Reset to first page on sorting
};

</script>

<template>
    <div class="relative">
        <!-- Search Bar -->
        <div class="mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for a country..."
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            />
        </div>

        <div class="overflow-y-auto mb-4">
            <!-- Table -->
            <table class="min-w-full table-auto border-collapse border-spacing-4 bg-white rounded-lg overflow-hidden">
                <thead class="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th class="text-center w-24 p-3">Flag</th>

                        <th class="text-left w-40 p-3 cursor-pointer whitespace-nowrap" @click="setSorting('name')">
                            Name
                            <font-awesome-icon 
                                v-if="sortColumn === 'name' && sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn === 'name' && sortDirection === 'desc'" 
                                :icon="faSortDown" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn !== 'name'" 
                                :icon="faSort" 
                                class="inline-block h-3 w-4"
                            />
                        </th>

                        <th class="text-center w-32 p-3">
                            Code
                        </th>

                        <th class="text-left w-40 p-3 cursor-pointer whitespace-nowrap" @click="setSorting('region')">
                            Region
                            <font-awesome-icon 
                                v-if="sortColumn === 'region' && sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn === 'region' && sortDirection === 'desc'" 
                                :icon="faSortDown" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn !== 'region'" 
                                :icon="faSort" 
                                class="inline-block h-3 w-4"
                            />
                        </th>

                        <th class="text-left w-40 p-3 cursor-pointer whitespace-nowrap" @click="setSorting('subregion')">
                            Subregion
                            <font-awesome-icon 
                                v-if="sortColumn === 'subregion' && sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn === 'subregion' && sortDirection === 'desc'" 
                                :icon="faSortDown" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn !== 'subregion'" 
                                :icon="faSort" 
                                class="inline-block h-3 w-4"
                            />
                        </th>

                        <th class="text-left w-32 p-3 text-center">
                            Currencies
                        </th>

                        <th class="text-left w-40 p-3 cursor-pointer whitespace-nowrap" @click="setSorting('capital')">
                            Capital
                            <font-awesome-icon 
                                v-if="sortColumn === 'capital' && sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn === 'capital' && sortDirection === 'desc'" 
                                :icon="faSortDown" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn !== 'capital'" 
                                :icon="faSort" 
                                class="inline-block h-3 w-4"
                            />
                        </th>

                        <th class="text-left w-40 p-3 cursor-pointer whitespace-nowrap" @click="setSorting('population')">
                            Population
                            <font-awesome-icon 
                                v-if="sortColumn === 'population' && sortDirection === 'asc'" 
                                :icon="faSortUp" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn === 'population' && sortDirection === 'desc'" 
                                :icon="faSortDown" 
                                class="inline-block h-3 w-4"
                            />
                            <font-awesome-icon 
                                v-if="sortColumn !== 'population'" 
                                :icon="faSort" 
                                class="inline-block h-3 w-4"
                            />
                        </th>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody class="text-gray-600 divide-y divide-gray-200">
                    <tr
                        v-for="country in paginatedCountries"
                        :key="country.code"
                        class="hover:bg-gray-100 transition-colors h-[4.5rem]"
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
                        <td class="w-40 max-w-40 p-3 truncate">
                            <div class="overflow-x-auto">{{ country.name }}</div>
                        </td>

                        <!-- Country Code -->
                        <td class="w-32 max-w-32 p-3 text-center">
                            <div class="flex items-center justify-center overflow-x-auto">{{ country.code }}</div>
                        </td>

                        <!-- Region -->
                        <td class="w-40 max-w-40 p-3 truncate">
                            <div class="h-full flex items-center overflow-x-auto">{{ country.region }}</div>
                        </td>

                        <!-- Subregion -->
                        <td class="w-40 max-w-40 p-3 truncate">
                            <div class="overflow-x-auto">{{ country.subregion }}</div>
                        </td>

                        <!-- Currencies -->
                        <td class="w-32 max-w-32 p-3 text-center truncate">
                            <div class="overflow-x-auto">{{ country.currencies }}</div>
                        </td>

                        <!-- Capital -->
                        <td class="w-40 max-w-40 p-3 truncate">
                            <div class="overflow-x-auto">{{ country.capital }}</div>
                        </td>

                        <!-- Population -->
                        <td class="w-40 max-w-40 p-3 truncate">
                            <div class="overflow-x-auto">{{ country.population }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

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
    padding-bottom: 5px;
    padding-top: 5px;
}

img {
    height: 20px;
}

th svg {
    vertical-align: baseline;
}
</style>
