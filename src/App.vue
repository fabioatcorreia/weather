<template>
  <div id="app">Weather Forecast
    <LocationInput @input="onInput"/>
    <div v-if="isLoading">Loading...</div>
    <div v-else v-for="item in forecast" :key="item.date">{{item}}</div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import LocationInput from "./components/LocationInput.vue";
import { WeatherService } from "./services/WeatherService";

export default {
  name: "app",
  components: {
    LocationInput
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
        return Promise.reject("Invalid location!");
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
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: center;
  padding-top: 60px;
}
</style>
