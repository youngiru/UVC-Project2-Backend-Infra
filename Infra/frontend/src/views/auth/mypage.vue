<template>
  <div>
    <app-header />
    <div style="width: 500px; margin: 150px auto 0">
      <b-form-group label="이름" label-for="name" label-cols="3">
        <b-form-input id="name" v-model="user.name" disabled></b-form-input>
      </b-form-group>
      <b-form-group label="아이디" label-for="userid" label-cols="3">
        <b-form-input id="userid" v-model="user.userid"></b-form-input>
      </b-form-group>
      <b-form-group label="비밀번호" label-for="password" label-cols="3">
        <b-form-input id="password" v-model="user.password" type="password"></b-form-input>
      </b-form-group>
      <b-form-group label="직급" label-for="rank" label-cols="3">
        <b-form-input id="rank" v-model="user.rank" disabled></b-form-input>
      </b-form-group>
      <b-form-group label="권한" label-for="role" label-cols="3">
        <b-form-input id="role" v-model="user.role" disabled></b-form-input>
      </b-form-group>
      <b-form-group label="이메일" label-for="email" label-cols="3">
        <b-form-input id="email" v-model="user.email" disabled></b-form-input>
      </b-form-group>
      <b-form-group label="전화번호" label-for="phone" label-cols="3">
        <b-form-input id="phone" v-model="user.phone" disabled></b-form-input>
      </b-form-group>
      <b-button style="margin-top: 50px" block variant="dark" @click="onSubmit">확인</b-button>
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/leaderheader.vue'

export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      user: {
        name: null,
        userid: null,
        password: null,
        rank: null,
        role: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    }
  },
  created() {
    this.user = this.$store.getters.TokenUser
    console.log('mypage', this.user)
  },
  methods: {
    onSubmit() {
      this.$router.push('/')
      this.$store.dispatch('authLogout')
    }
  }
}
</script>

<style lang="scss" scoped></style>
