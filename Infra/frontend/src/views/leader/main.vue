<template>
  <div id="leader_main_wrap">
    <div class="leader_main_header">
      <h2 @click="$router.push('/')">설비관리시스템</h2>
    </div>
    <div class="leader_main_box">
      <b-container class="bv-example-row leader_main_box_co">
        <b-row>
          <b-col class="leader_main_text" @click="$router.push('/leader/user')">사용자 관리</b-col>
          <b-col class="leader_main_text" @click="$router.push('/leader/device')">기기 관리</b-col>
          <b-col class="leader_main_text" @click="$router.push('/control/dashboard')">기기 제어</b-col>
          <b-col class="leader_main_text" @click="$router.push('/auth/logout')">로그아웃</b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="@/assets/sass/main.css"></style>
