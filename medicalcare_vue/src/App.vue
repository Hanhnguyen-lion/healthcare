<template>
  <!-- <LoginComponent></LoginComponent> -->
  <HelloWorld msg="Test"></HelloWorld>
</template>

<script>
// import LoginComponent from './components/account/LoginComponent.vue'
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    // LoginComponent,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
