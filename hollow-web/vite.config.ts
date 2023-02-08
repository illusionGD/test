import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/**
 * @description: 公共配置对象
 */
const getCommonConfig = function (mode: string) {
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            extension: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            alias: {
                '@': '/src'
            }
        },
        assetsInclude: ['src/**/*.pmd', 'src/**/*.pmx', 'src/**/*.vmd'], // 模型文件后缀
        css: {
            postcss: {
                plugins: [
                    pxtorem({
                        rootValue: loadEnv(mode, process.cwd()).VITE_FIX_UNIT,
                        propList: ['*'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 3,
                        exclude: /node_modules/i
                    }),
                    autoprefixer({
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
                ]
            },
            //css预处理
            preprocessorOptions: {
                scss: {
                    charset: false,
                    additionalData: '@import "@/assets/css/globalVariable.scss";'
                }
            }
        },
        server: {
            hmr: {
                overlay: false // 去掉错误提示
            },
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
    // build: {
    //   minify: 'terser',
    //   terserOptions: {
    //     compress: {
    //       //生产环境时移除console
    //       drop_console: true,
    //       drop_debugger: true
    //     },
    //   },
    // }
}

export default defineConfig(({ command, mode, ssrBuild }) => {
    const commonConfig = getCommonConfig(mode)
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
