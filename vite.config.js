import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // You can change the port if needed
    open: true, // Automatically open the app in the browser
  },
  build: {
    outDir: 'dist', // The directory where the build files will be placed
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js'], // Make sure to pre-bundle supabase dependency
  },
  define: {
    'process.env': process.env, // Optional, just in case you need to pass env variables
  },
});
