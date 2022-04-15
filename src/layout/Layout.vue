<template>
  <div class="layout">
    <Navbar/>
    <div class="ui container">
      <slot/>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Layout",
  components: {
    Navbar
  }
}
</script>

<style>
</style>