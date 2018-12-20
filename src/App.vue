<template>
  <main id="app">
    <header>
      <h1>Weather Forecast</h1>
    </header>
    <LocationInput @input="onInput"/>
    <div class="loader" v-show="isLoading">Loading...</div>
    <div v-if="!isLoading" class="forecast-container">
      <Forecast :data="item" v-for="item in forecast" :key="item.date"/>
    </div>
    <p v-show="!forecast.length">Please enter a location to get its weather forecast.</p>
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
      forecast: [],
      weatherService: new WeatherService()
    };
  },

  created() {
    this.getForecast();
  },

  methods: {
    async getForecast(location = "Porto") {
      if (!location) {
        this.forecast = [];
        return;
      }

      this.isLoading = true;
      this.forecast = await this.weatherService.getForecast(location);
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
