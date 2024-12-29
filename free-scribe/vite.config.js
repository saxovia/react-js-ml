import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.js',
        plugins: [tailwindcss()],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    worker: ['./src/utils/whisper.worker.js'],
                },
            },
        },
    },
    worker: {
        format: 'es', // Ensure workers use ES module format
    },
});
