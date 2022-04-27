<template>
  <div id="leader_header_wrap">
    <b-row class="leader_header_con">
      <b-col sm="5">
        <h2 @click="$router.push('/')">설비관리시스템</h2>
      </b-col>
      <b-col sm="7" style="text-align: right">
        <div class="leader_header_navbox">
          <b-container class="bv-example-row leader_main_box_co">
            <b-row>
              <b-col class="leader_header_nav" @click="$router.push('/leader/user')">사용자 관리</b-col>
              <b-col class="leader_header_nav" @click="$router.push('/leader/device')">기기 관리</b-col>
              <b-col class="leader_header_nav" @click="$router.push('/control/dashboard')">기기 제어</b-col>
              <b-col class="leader_header_nav" @click=";[$router.push('/auth/mypage')]">마이페이지</b-col>
              <b-col class="leader_header_nav" @click="$router.push('/auth/logout')">로그아웃</b-col>
            </b-row>
          </b-container>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    updatedResult() {
      return this.$store.getters.UserUpdatedResult
    }
    // tokenUser() {
    //   return this.$store.getters.TokenUser
    // }
  }
  // watch: {
  //   tokenUser(value) {
  //     console.log('tokenTest', value)
  //     // 수정 후 처리
  //     if (value !== null) {
  //       if (value > 0) {
  //         // 수정이 성공한 경우

  //         // 1. 메세지 출력
  //         this.$bvToast.toast('수정 되었습니다.', {
  //           title: 'SUCCESS',
  //           variant: 'success',
  //           solid: true
  //         })

  //         // 2. 리스트 재 검색
  //         this.searchUserList()
  //       } else {
  //         // 수정이 실패한 경우
  //         this.$bvToast.toast('수정이 실패하였습니다.', {
  //           title: 'ERROR',
  //           variant: 'danger',
  //           solid: true
  //         })
  //       }
  //     }
  //   }
  // },
  // created() {
  //   this.searchUserList()
  // },
  // methods: {
  //   searchUserList() {
  //     this.$store.dispatch('actUserList', this.search)
  //   },
  //   onClickEdit() {
  //     // (수정을 위한)상세정보

  //     // 1. 입력모드 설정
  //     this.$store.dispatch('actUserInputMode', 'update')

  //     // / 2. 상세정보 호출
  //     this.$store.dispatch('actUserInfo')

  //     console.log('test8')
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
