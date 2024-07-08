import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/netflix_clone/",
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
