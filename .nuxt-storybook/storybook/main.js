module.exports = {
  webpackFinal(config, options) {
    return options.nuxtStorybookConfig.webpackFinal(config, options)
  },
  stories: ['../../components/**/*.stories.@(ts|js)'],
}
