module.exports = {
  // js缓存，在output时加hash值，避免更改后直接取缓存没更新
  // cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
}