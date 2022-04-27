<template>
  <div id="webgl'">
    <app-header />
    <edukit />
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'
import edukit from './views/index.vue'

export default {
  name: 'Webgl',
  components: {
    edukit,
    'app-header': Header
  }
}
</script>

<style>
#webgl {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
