const WEATHER_API_QUERY =
  'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text ="%s")';

const WEATHER_API_URL =
  "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

export class WeatherService {
  /**
   *
   * @param {string} location
   */
  getForecast(location) {
    return this._getForecastData(location).then(this._getForecastFromData);
  }

  /**
   *
   * @param {string} text
   */
  buildRequestUrl(text) {
    return encodeURI(WEATHER_API_URL + WEATHER_API_QUERY.replace("%s", text));
  }

  /**
   *
   * @param {string} location
   */
  _getForecastData(location) {
    return fetch(this.buildRequestUrl(location)).then(response =>
      response.json()
    );
  }

  /**
   *
   * @param {*} data
   */
  _getForecastFromData(data) {
    if (!data || !data.query.results) {
      return [];
    }

    return data.query.results.channel.item.forecast;
  }
}
