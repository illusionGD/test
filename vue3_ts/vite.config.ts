import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const commonConfig = {
  plugins: [vue()],
  resolve: {
    extension: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
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
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      },
    },
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
