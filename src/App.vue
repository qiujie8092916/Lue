<template>
  <div id="app">
    <div v-bind:class="classObject">这是text: {{text}}</div>
    <input v-model="text" />
    <textarea v-model="textarea"></textarea>
    <button type="button" v-click="clickButton($event, 'qiujie', textarea)">点我</button>
  </div>
</template>

<script>
import App from './App.js'
export default App
</script>

<style>
#lue {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
