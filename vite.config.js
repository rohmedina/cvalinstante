import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoName = 'cvalinstante';

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  css: {
    postcss: './postcss.config.js',
  },
})
