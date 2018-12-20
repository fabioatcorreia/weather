<template>
  <div class="location-container">
    <label for="location">Location</label>
    <input id="location" type="text" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: "LocationInput"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-container {
  margin: 0 16px;
}

label {
  display: block;
  padding: 5px 0;
}

input {
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 30px;
  padding: 5px 10px;
  width: 100%;
}

@media (min-width: 768px) {
  label {
    display: initial;
    margin: 10px;
  }

  input {
    width: 50%;
  }
}
</style>
