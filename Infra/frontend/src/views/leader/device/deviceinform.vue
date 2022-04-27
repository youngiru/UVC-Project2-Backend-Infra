<template>
  <div>
    <b-modal id="modal-device-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="device.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="기기명" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="device.name"></b-form-input>
        </b-form-group>
        <b-form-group label="설치장소" label-for="location" label-cols="3">
          <b-form-input id="location" v-model="device.location"></b-form-input>
        </b-form-group>
        <b-form-group label="상세정보" label-for="description" label-cols="3">
          <b-form-input id="description" v-model="device.description"></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      device: {
        id: null,
        name: null,
        location: null,
        description: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Device
    },
    inputMode() {
      return this.$store.getters.DeviceInputMode
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
      return this.device.createdAt && this.device.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.device = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.device = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actDeviceInsert', this.device) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actDeviceUpdate', this.device) // 수정 실행
      }
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
