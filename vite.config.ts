import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },
    base: '/',
    build: {
      target: 'esnext',
    },
    resolve: {
      alias: {
        src: '/src',
      },
    },
    plugins: [react(), svgr()],
  })
}
