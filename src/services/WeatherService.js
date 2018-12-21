const WEATHER_API_QUERY =
  'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text ="%s")';

const WEATHER_API_URL =
  "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

export class WeatherService {
  /**
   * Get forecast from the Yahoo API for the given location.
   * @param {string} location - Location to get the forecast from.
   * @returns {Promise}
   */
  getForecast(location) {
    return this._getForecastData(location).then(this._getForecastFromData);
  }

  /**
   * Builds the url to use for the request to the Yahoo weather API.
   * @param {string} text - Value to use in the query to the Yahoo API.
   * @returns {string}
   */
  _buildRequestUrl(text) {
    return encodeURI(WEATHER_API_URL + WEATHER_API_QUERY.replace("%s", text));
  }

  /**
   * Send GET HTTP request for the forecast information from the given location.
   * @param {string} location - Location to get the forecast from.
   * @returns {Promise}
   */
  _getForecastData(location) {
    return fetch(this._buildRequestUrl(location)).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    });
  }

  /**
   * Get the location and forecast information retrieved by the weather API.
   * @param {Object} data - Reponse from the Yahoo Weather API.
   * @returns {{forecastData: Object, locationData?: Object}}
   */
  _getForecastFromData(data) {
    if (!data || !data.query.results) {
      return { forecastData: [] };
    }

    const response = data.query.results.channel;

    return {
      forecastData: response.item.forecast,
      locationData: response.location
    };
  }
}
