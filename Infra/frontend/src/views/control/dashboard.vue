<template>
  <div>
    <app-header />
    <div>
      <iframe
        src="http://localhost:3000/d-solo/ml6t63snz/uvc-edukit?orgId=1&refresh=1s&panelId=2"
        width="750"
        height="320"
        frameborder="4"
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/ml6t63snz/uvc-edukit?orgId=1&refresh=1s&panelId=4"
        width="750"
        height="320"
        frameborder="4"
      ></iframe>
    </div>
    <div>
      <iframe
        src="http://localhost:3000/d-solo/ml6t63snz/uvc-edukit?orgId=1&refresh=1s&panelId=6"
        width="750"
        height="320"
        frameborder="4"
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/ml6t63snz/uvc-edukit?orgId=1&refresh=1s&panelId=8"
        width="750"
        height="320"
        frameborder="4"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
