<script setup>

import { state } from '../store/store.js';
import { ref, onMounted, computed } from 'vue';
import CountryTable from '../components/CountryTable.vue'; 
import CountriesByRegionChart from '../components/CountriesByRegionChart.vue';
  
// Get the user's name from the store
const name = computed(() => state.user.name);
  
// State to hold countries data
const countries = ref([]);
  
// Toggle switch state (true = chart, false = table)
const isChartView = ref(false);
  
// Loading state
const isLoading = ref(true);
  
// Function to fetch data from the API
const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
    
        // Process the data to include only the required fields
        countries.value = data.map(country => ({
            flag: country.flags?.png || '', 
            name: country.name.common,
            code: country.cca2,
            region: country.region,
            subregion: country.subregion ?? 'N/A',
            currencies: country.currencies
                ? Object.keys(country.currencies)[0]
                : 'N/A',
            capital: country.capital ? country.capital[0] : 'N/A',
            population: country.population.toLocaleString(),
        }));
    } catch (error) {
        console.error('Error fetching countries:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchCountriesData();
});
  
</script>

<template>
    <div class="w-full flex flex-col bg-gray-50 pb-[50px]">
      
        <!-- Header -->
        <div class="pt-[60px] pb-[50px]">
            <h1 class="text-3xl leading-none tracking-tight text-gray-900 text-center">
                Welcome, <span class="font-bold text-gray-600">{{ name }}!</span>
            </h1>
        </div>

        <!-- Toggle Switch -->
        <div class="flex justify-center items-center pb-[30px]">
            <div class="flex items-center">
                <!-- Toggle text (Table) -->
                <span class="mr-4 text-lg text-gray-800 font-medium">Table</span>
                
                <!-- Toggle -->
                <label class="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        v-model="isChartView"
                        class="sr-only peer"
                        aria-label="Toggle between Table and Chart views"
                    />
                    <div
                        class="w-16 h-8 bg-gray-400 rounded-full peer-checked:bg-blue-500 transition-all duration-300 ease-in-out
                        border-2 border-gray-400 peer-checked:border-blue-500"
                    ></div>
                    <span
                        class="absolute top-0 left-0 w-8 h-8 bg-white rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:translate-x-8 transition-transform duration-300 ease-in-out"
                    ></span>
                </label>
                
                <!-- Toggle text (Chart) -->
                <span class="ml-4 text-lg text-gray-800 font-medium">Chart</span>
            </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
  
        <!-- Table or Chart -->
        <div v-else class="w-full max-w-screen-xl mx-auto px-4">
            <div class="mt-5">
                <div v-if="!isChartView">
                    <CountryTable :countries="countries" />
                </div>
                <div v-else>
                    <CountriesByRegionChart />
                </div>
            </div>
        </div>
      
    </div>
</template>
