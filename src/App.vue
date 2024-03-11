
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './pages/Login.vue';
import Home from './pages/Home.vue';
export default {
  name: "App",
  components: {
      Login,
      Home
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
