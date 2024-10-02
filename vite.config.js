import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/rest-countries-api/', 
    build: {
        outDir: 'dist'
    }
})
