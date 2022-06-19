import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "@/assets/css/globalVariable.scss";'
      }
    }
  }
})