<template>
  <article class="card weather-forecast">
    <h3>{{data.date}}</h3>
    <p class="description">{{data.text}}</p>
    <div>Max: {{data.high}}°</div>
    <div class="minimum-temperature">Min: {{data.low}}°</div>
  </article>
</template>

<script>
export default {
  name: "Forecast",
  props: {
    data: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  padding: 16px;
  margin: 16px;
  background: #fff;
  border: 1px solid #999;
  border-radius: 5px;
}

.minimum-temperature {
  color: darkblue;
}
</style>
