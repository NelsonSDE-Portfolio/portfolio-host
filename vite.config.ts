import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const challengeTrackerUrl = env.VITE_CHALLENGE_TRACKER_URL || 'http://localhost:4001';
  const ledgerUrl = env.VITE_LEDGER_TRACKER_URL || 'http://localhost:4002';

  return {
    plugins: [
      react(),
      federation({
        name: 'portfolio-host',
        remotes: {
          challengeTracker: `${challengeTrackerUrl}/assets/remoteEntry.js`,
          ledger: `${ledgerUrl}/assets/remoteEntry.js`,
        },
        shared: ['react', 'react-dom', 'react-router-dom', '@clerk/clerk-react'],
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
      minify: true,
      cssCodeSplit: false,
    },
  };
});
