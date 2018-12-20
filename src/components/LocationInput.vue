<template>
  <input type="text" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  name: "LocationInput"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
