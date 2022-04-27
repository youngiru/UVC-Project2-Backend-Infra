<template>
  <div>
    <b-nav class="controlheader_nav">
      <b-nav-item v-if="tokenUserRole == 'leader'" @click="$router.push('/leader')">관리자페이지</b-nav-item>
      <b-nav-item v-else-if="tokenUserRole == 'member'"></b-nav-item>
      <b-nav-item active @click="$router.push('/control/dashboard')">대시보드</b-nav-item>
      <b-nav-item @click="$router.push('/webgl')">3D</b-nav-item>
      <b-nav-item @click="$router.push('/control/workhistory')">작업이력</b-nav-item>
      <b-nav-item @click="$router.push('/control/factorycontrol')">공장제어</b-nav-item>
      <b-nav-item @click="$router.push('/auth/mypage')">마이페이지</b-nav-item>
      <b-nav-item @click="$router.push('/auth/logout')">로그아웃</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  computed: {
    tokenUserRole() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.role
    }
    //   getTest() {
    //     let test = ''
    //     if (this.tokenUser == 'leader') {
    //       test = '관리자페이지'
    //       console.log('test3')
    //     } else if (this.tokenUser == 'member') {
    //       console.log('test5')
    //       test = ''
    //     }
    //     return test
    //   }
    // },
    // watch: {
    //   tokenUser(value) {
    //     console.log('test6', value)
    //     if (value == 'leader') {
    //       console.log('test3')
    //       this.$router.push('/leader')
    //     } else if (value == 'member') {
    //       console.log('test5')
    //     }
    //   }
  }
}
</script>

<style lang="scss" scoped></style>
