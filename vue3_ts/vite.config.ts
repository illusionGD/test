import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'

/**
 * @description: px转rem单位
 */
const pxtorem_p = pxtorem({
  rootValue: 19.2,
  propList: ['*'],
  replace: true,
  mediaQuery: false,
  minPixelValue: 3,
  exclude: /node_modules/i
})

/**
 * @description: css前缀，兼容
 */
const autoprefixer_p = autoprefixer({
  overrideBrowserslist: [
    "Android 4.1",
    "iOS 7.1",
    "Chrome > 31",
    "ff > 31",
    "ie >= 8",
    "last 2 versions",
  ],
  grid: true
})

/**
 * @description: 公共配置对象
 */
const commonConfig = {
  plugins: [
    vue()
  ],

  resolve: {
    extension: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': '/src'
    }
  },
  css: {
    postcss: {
      plugins: [pxtorem_p, autoprefixer_p]
    },
    //css预处理
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "@/assets/css/globalVariable.scss";'
      }
    }
  }
}

/**
 * @description: 开发环境配置对象
 */
const devConfig = {}

/**
 * @description: 生产环境配置对象
 */
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
