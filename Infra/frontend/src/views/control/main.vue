<template>
  <div id="control_main_wrap">
    <div class="control_main_box">
      <b-container class="bv-example-row control_main_box_co">
        <b-row>
          <b-col class="control_main_text" @click="$router.push('/control/dashboard')">대시보드</b-col>
          <b-col class="control_main_text" @click="$router.push('/webgl')">3D</b-col>
          <b-col class="control_main_text" @click="$router.push('/control/workhistory')">작업이력</b-col>
          <b-col class="control_main_text" @click="$router.push('/control/factorycontrol')">공장제어</b-col>
          <b-col class="control_main_text" @click="$router.push('/auth/logout')">로그아웃</b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="@/assets/sass/main.css"></style>
