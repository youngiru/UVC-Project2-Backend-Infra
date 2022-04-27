<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-modal id="modal-user-inform" :title="getTitle" @ok="handleSubmit(onSubmit)">
        <div>
          <validation-provider v-slot="validationContext" name="Name" :rules="{ required: true, min: 2 }">
            <b-form-group label="이름" label-for="name" label-cols="3">
              <b-form-input
                id="name"
                v-model="user.name"
                name="name"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Id" :rules="{ required: true }">
            <b-form-group v-if="inputMode === 'insert'" label="아이디" label-for="userid" label-cols="3">
              <b-form-input
                id="userid"
                v-model="user.userid"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Password" :rules="{ required: true, min: 4 }">
            <b-form-group v-if="inputMode === 'insert'" label="비밀번호" label-for="password" label-cols="3">
              <b-form-input
                id="password"
                v-model="user.password"
                type="password"
                :state="getValidationState(validationContext)"
                aria-describedby="input-3-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-3-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Rank" :rules="{ required: true }">
            <b-form-group label="직급" label-for="rank" label-cols="3">
              <b-form-select
                id="rank"
                v-model="user.rank"
                :options="userRank.options"
                :state="getValidationState(validationContext)"
                aria-describedby="input-4-live-feedback"
              >
              </b-form-select>
              <b-form-invalid-feedback id="input-4-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Role" :rules="{ required: true }">
            <b-form-group label="권한" label-for="Role" label-cols="3">
              <b-form-radio-group
                id="auth"
                v-model="user.role"
                :options="userRole.options"
                :state="getValidationState(validationContext)"
                aria-describedby="input-5-live-feedback"
              />
              <b-form-invalid-feedback id="input-5-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Email" :rules="{ required: true }">
            <b-form-group label="이메일" label-for="email" label-cols="3">
              <b-form-input
                id="email"
                v-model="user.email"
                :state="getValidationState(validationContext)"
                aria-describedby="input-6-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-6-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider v-slot="validationContext" name="Phone" :rules="{ required: true }">
            <b-form-group label="전화번호" label-for="phone" label-cols="3">
              <b-form-input
                id="phone"
                v-model="user.phone"
                :state="getValidationState(validationContext)"
                aria-describedby="input-7-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-7-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </div>
      </b-modal>
    </validation-observer>
  </div>
</template>

<script>
export default {
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
      },
      userRole: {
        default: 'member', // 기본값
        options: [
          { value: 'leader', text: '팀장' },
          { value: 'member', text: '팀원' }
        ]
      },
      userRank: {
        options: [
          { value: '사원', text: '사원' },
          { value: '주임', text: '주임' },
          { value: '대리', text: '대리' },
          { value: '과장', text: '과장' },
          { value: '차장', text: '차장' },
          { value: '부장', text: '부장' },
          { value: '상무', text: '상무' }
        ]
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '등록'
      } else if (this.inputMode === 'update') {
        title = '수정'
      }

      return title
    },
    getCreatedAt() {
      return this.user.createdAt && this.user.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.user = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.user = { ...this.infoData }

    this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    resetForm() {
      this.user = {
        name: null,
        userid: null,
        password: null,
        rank: null,
        role: null,
        email: null,
        phone: null
      }
      this.$nextTick(() => {
        this.$validator.reset()
      })
    },
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actUserInsert', this.user) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actUserUpdate', this.user) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.user.role = this.userRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
