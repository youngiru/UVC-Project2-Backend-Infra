<template>
  <div id="leader_user_wrap">
    <app-header />
    <h3>사용자 관리</h3>
    <div class="leader_user_tablebox">
      <b-col style="text-align: right; padding: 0">
        <b-button variant="dark" style="margin-bottom: 10px" @click="onClickAddNew">추가</b-button>
      </b-col>
      <b-table striped hover :items="userList" :fields="fields" style="text-align: center">
        <template #cell(btn)="row">
          <b-button size="sm" variant="dark" class="mr-2" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" class="mr-2" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>
    <!-- 모달창 -->
    <Inform />
  </div>
</template>

<script>
import Header from '../../../components/layout/leaderheader.vue'
import inform from './userinform.vue'

export default {
  components: {
    'app-header': Header,
    Inform: inform
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: '순번'
        },
        {
          key: 'name',
          label: '이름'
        },
        {
          key: 'userid',
          label: 'ID'
        },
        {
          key: 'rank',
          label: '직급'
        },
        {
          key: 'btn',
          label: '비고'
        }
      ],
      search: {
        name: ''
      }
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult
    },
    updatedResult() {
      return this.$store.getters.UserUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.UserDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchUserList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      this.$store.dispatch('actUserList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actUserInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-user-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actUserInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-user-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actUserDelete', id)
        }
      })
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
