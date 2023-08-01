import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'CHYT229TBS.com.etc.ambientlearning',
  appName: 'Ambient Learning',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  
};

export default config;
