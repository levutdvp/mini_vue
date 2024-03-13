
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import store from "./store/store";

onBeforeMount(() => {
  store.dispatch("pushUserInfo");
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
