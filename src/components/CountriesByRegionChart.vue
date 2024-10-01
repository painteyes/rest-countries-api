<script setup>
import { ref, onMounted } from 'vue';
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
  
// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
// State to store countries data
const regionsData = ref({
    regions: [],
    counts: []
});
  
// Ref for the canvas element
const regionChartCanvas = ref(null);
  
// Function to fetch countries data and process it
const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
  
        // Group countries by region and count the number of countries in each region
        const regionCounts = data.reduce((acc, country) => {
            const region = country.region || 'Unknown';
            if (!acc[region]) {
                acc[region] = 0;
            }
            acc[region]++;
            return acc;
        }, {});
  
        // Extract region names and their respective counts for Chart.js
        regionsData.value = {
            regions: Object.keys(regionCounts),
            counts: Object.values(regionCounts),
        };
  
        // After processing data, create the chart
        createChart();
    } catch (error) {
        console.error('Error fetching countries data:', error);
    }
  };
  
// Function to create the bar chart
const createChart = () => {
    if (regionChartCanvas.value) {
        const ctx = regionChartCanvas.value.getContext('2d');
      
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: regionsData.value.regions, // X-axis (Region names)
                datasets: [
                    {
                        label: 'Number of Countries',
                        data: regionsData.value.counts, // Y-axis (Number of countries per region)
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Countries',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Regions',
                        },
                    },
                },
            },
        });
    }
};
  
onMounted(() => {
    fetchCountriesData();
});
</script>

<template>
    <div class="container mx-auto">
        <canvas ref="regionChartCanvas"></canvas>
    </div>
</template>
  
  

  