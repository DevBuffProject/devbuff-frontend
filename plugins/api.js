export default function ({ $config, $http, env }, inject) {
  const $api = {
    v1: $http.create({
      // See https://github.com/sindresorhus/ky#options
    })
  }

  $api.v1.setBaseURL($config.API_BASE_URL)

  // Inject to context as $api
  inject('api', $api)
}
