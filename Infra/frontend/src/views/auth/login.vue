<template>
  <div id="Login_wrap">
    <h3>로그인</h3>
    <div class="Login_inform">
      <b-form v-if="show" class="Login_informbox">
        <b-form-group id="Login_idbox" label-for="Login_id">
          <b-form-input
            id="Login_id"
            v-model="form.userid"
            type="text"
            placeholder="아이디를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="Login_pwbox" label-for="Login_pw">
          <b-form-input
            id="Login_pw"
            v-model="form.password"
            type="password"
            aria-describedby="password-help-block"
            placeholder="비밀번호를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-button
          href="#none"
          type="submit"
          variant="primary"
          class="Login_btn"
          @keyup.enter="onSubmit"
          @click="onSubmit"
          >로그인</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      form: {
        userid: null,
        password: null
      },
      show: true
    }
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.tokenError
    }
  },
  watch: {
    tokenUser(value) {
      console.log('tokenUser', value.role)
      if (value !== null && value.role === 'leader') {
        console.log('value', value)
        // 로그인이 완료된 상황
        this.$router.push('/leader') // 메인페이지 이동
      } else if (value !== null && value.role === 'member') {
        this.$router.push('/control')
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메세지 출력
        this.$bvToast.toast('아이디/비밀번호를 확인해 주세요.', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우
      } else {
        // 토큰이 만료된 경우
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('authLogin', { userid: this.form.userid, password: this.form.password })
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
