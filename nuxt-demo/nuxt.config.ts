export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // 全局路由守卫
  router: {
    // middleware: 'auth'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/css/main.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  server: {
    port: 3100
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/sentry'],

  styleResources: {
    less: ['./assets/css/main.less']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  sentry: {
    dsn: 'https://3321a338b20741b9ae8fc316762a392f@o4504998667812864.ingest.sentry.io/4505000891777024',
    disableServerSide: false,
    disableClientSide: false,
    publishRelease: {
      configFile: '.sentryclirc',
      urlPrefix: '', // sourcemap文件的url前缀
      // Attach commits to the release (requires that the build triggered within a git repository).
      setCommits: {
        auto: true
      }
    },
    sourceMapStyle: 'hidden-source-map'
  }
}
