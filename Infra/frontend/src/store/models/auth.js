import api from '../apiUtil'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// 테스트용 토큰
// {
//   "id": 1,
//   "name": "Kim",
//   "nickname": "kim",
//   "iat": 1627339022,
//   "exp": 2000000000
// }

// const testToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiS2ltIiwibmlja25hbWUiOiJraW0iLCJpYXQiOjE2MjczMzkwMjIsImV4cCI6MjAwMDAwMDAwMH0.d0N7Cj4nMqjUX4DGNcvziX50LwVMQhXqY3iGDOw5Rgc'

const stateInit = {
  TokenUser: {
    id: null,
    name: null,
    userid: null,
    password: null,
    rank: null,
    email: null,
    phone: null,
    role: null,
    iat: null,
    exp: null
  }
}

export default {
  state: {
    TokenUser: { ...stateInit.TokenUser }, // token에서 추출한 사용자 정보
    Loading: false,
    Error: null
  },
  getters: {
    TokenUser: state => state.TokenUser,
    TokenLoading: state => state.Loading,
    TokenError: state => state.Error
  },
  mutations: {
    setTokenUser(state, data) {
      state.TokenUser = data
      // console.log('here', state.TokenUser)
    },
    setLoading(state, data) {
      state.Loading = data
      state.Error = null
    },
    setError(state, data) {
      state.Error = data
      state.Loading = false
      state.TokenUser = { ...stateInit.TokenUser }
    },
    clearError(state) {
      state.Error = null
    },
    setLogout(state) {
      state.Loading = false
      state.Error = null
      state.TokenUser = { ...stateInit.TokenUser }
    }
  },
  actions: {
    authLogin(context, payload) {
      // 로그인 처리
      console.log('authlogin', payload)
      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)
      /* RestApi 호출 */
      axios
        .post('/serverApi/auths/login', payload)
        .then(response => {
          console.log('here', response)
          const token = response.headers.token
          const decodedToken = jwtDecode(token)
          console.log('token', decodedToken)
          // 정상인 경우 처리
          context.commit('setLoading', false)
          context.commit('setTokenUser', decodedToken)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('login', error)
          context.commit('setLoading', false)
          context.commit('setError', error)
        })
      // api.post('/serverApi/test', payload).then(res => console.log(res.data))
    },
    async authLogout(context) {
      // 로그아웃 처리

      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)

      /* RestApi 호출 */
      // api 결과와 관계없이 로컬에서는 로그아웃 처리 함

      try {
        await api.delete('/serverApi/auths/logout') // await를 걸지 않으면 토큰삭제 후 전송될 수 있음
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      } catch (err) {
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    },
    authTokenUser(context, payload) {
      // 토큰사용자 설정
      const decodedToken = jwtDecode(payload)
      context.commit('setTokenUser', decodedToken)
      // console.log('tokenUser', payload)
    }
  }
}
