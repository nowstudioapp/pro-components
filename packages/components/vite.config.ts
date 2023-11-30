import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { NAME } from '../../constants'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ElementPlus({})],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwind({
          content: ['./src/**/*.{vue,css,jsx,tsx}'],
          theme: {
            extend: {}
          },
          corePlugins: {
            preflight: false
          }
        })
      ]
    }
  },
  build: {
    outDir: resolve(__dirname, `./dist`),
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: NAME,
      formats: ['es', 'umd'],
      fileName: 'index.min'
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'iconsVue'
        },

        assetFileNames: 'index.min[extname]'
      },
      input: resolve(__dirname, './src/index.ts')
    }
  }
})
