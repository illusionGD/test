import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { minify } from "terser";

const commonConfig = {
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
}

const devConfig = {}

const prodConfig = {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}

export default defineConfig(({ command, mode, ssrBuild }) => {
  let newConfig = {
    ...commonConfig
  }
  if (mode !== 'production') {
    newConfig = { ...newConfig, ...devConfig }
  } else {
    newConfig = { ...newConfig, ...prodConfig }
  }

  return newConfig
})
