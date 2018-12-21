<template>
  <main id="app">
    <header>
      <h1>Weather Forecast</h1>
    </header>
    <LocationInput @input="onInput"/>
    <section v-if="!isLoading && !hasError">
      <h2 v-show="location.city">{{location.city + ', ' + location.country}}</h2>
      <div class="forecast-container">
        <Forecast :data="item" v-for="item in forecast" :key="item.date"/>
      </div>
    </section>
    <div class="loader" v-show="isLoading">Loading...</div>
    <p v-show="!forecast.length && !hasError">Please enter a valid location to get its weather forecast.</p>
    <p v-show="hasError">There was an error with your request.</p>
  </main>
</template>

<script>
import debounce from "lodash.debounce";
import LocationInput from "./components/LocationInput.vue";
import Forecast from "./components/Forecast.vue";
import { WeatherService } from "./services/WeatherService";

export default {
  name: "app",
  components: {
    LocationInput,
    Forecast
  },

  data() {
    return {
      isLoading: true,
      hasError: false,
      forecast: [],
      location: {},
      weatherService: new WeatherService()
    };
  },

  created() {
    this.getForecast();
  },

  methods: {
    async getForecast(location) {
      this.hasError = false;

      if (!location) {
        this.reset();
        return;
      }

      this.isLoading = true;
      try {
        const {
          forecastData,
          locationData
        } = await this.weatherService.getForecast(location);

        if (forecastData.length > 0) {
          this.forecast = forecastData.slice(0, 5);
          this.location = locationData;
        }
      } catch (error) {
        this.hasError = true;
      }
      this.isLoading = false;
    },

    reset() {
      this.forecast = [];
      this.location = {};
      this.isLoading = false;
    },

    onInput: debounce(function(location) {
      this.getForecast(location);
    }, 500)
  }
};
</script>

<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background: #eee;
  text-align: center;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.forecast-container {
  display: grid;
}

@media (min-width: 768px) {
  .forecast-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1224px) {
  .forecast-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
