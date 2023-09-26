import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
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
    plugins: [
      react(),
      svgr(),
      Unfonts({
        custom: {
          display: 'swap',
          families: [
            {
              name: 'Nunito Sans',
              local: 'Nunito Sans',
              src: './src/assets/fonts/Nunito-Sans/*.ttf',
              transform(font) {
                if (font.basename === 'NunitoSans-Bold') {
                  font.weight = 700
                }
                if (font.basename === 'NunitoSans-Light') {
                  font.weight = 400
                }
                if (font.basename === 'NunitoSans-Medium') {
                  font.weight = 600
                }
                return font
              },
            },
          ],
        },
      }),
    ],
  })
}
