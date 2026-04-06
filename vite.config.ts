import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'portfolio-host',
      remotes: {
        challengeTracker: 'http://localhost:4001/assets/remoteEntry.js',
      },
      exposes: {
        './AuthContext': './src/contexts/AuthContext.tsx',
        './authStore': './src/stores/authStore.ts',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand', '@clerk/clerk-react'],
    }),
  ],
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
