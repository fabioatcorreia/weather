module.exports = {
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      runtimeCaching: [
        {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp(
            "^https://query.yahooapis.com/v1/public/yql(.*)"
          ),
          handler: "cacheFirst",
          options: {
            cacheName: "yahoo-weather",
            expiration: {
              maxAgeSeconds: 10
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
};
