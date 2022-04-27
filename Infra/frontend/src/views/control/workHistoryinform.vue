<template>
  <div>
    <b-modal id="modal-workHistory-inform" :title="'등록'" @ok="onSubmit">
      <div>
        <b-form-group label="DeviceId" label-for="deviceId" label-cols="3">
          <b-form-input id="deviceId" v-model="workHistory.deviceId" name="deviceId"></b-form-input>
        </b-form-group>
        <b-form-group label="SensorId" label-for="sensorId" label-cols="3">
          <b-form-input id="sensorId" v-model="workHistory.sensorId" name="sensorId"></b-form-input>
        </b-form-group>
        <b-form-group label="UserId" label-for="userId" label-cols="3">
          <b-form-input id="userId" v-model="workHistory.userId" name="userId"></b-form-input>
        </b-form-group>
        <b-form-group label="목표수량" label-for="targetQuantity" label-cols="3">
          <b-form-input id="targetQuantity" v-model="workHistory.targetQuantity" name="targetQuantity"></b-form-input>
        </b-form-group>
        <b-form-group label="담당작업자" label-for="operator" label-cols="3">
          <b-form-input id="operator" v-model="workHistory.operator"></b-form-input>
        </b-form-group>
        <b-form-group label="투입수량" label-for="inputQuantity" label-cols="3">
          <b-form-input id="inputQuantity" v-model="workHistory.inputQuantity"></b-form-input>
        </b-form-group>
        <b-form-group label="색 선별" label-for="color" label-cols="3">
          <b-form-input id="color" v-model="workHistory.color"></b-form-input>
        </b-form-group>
        <b-form-group label="준비상태" label-for="ready" label-cols="3">
          <b-form-checkbox id="ready" v-model="workHistory.ready" name="ready" switch @ok="onReady">
            준비완료
          </b-form-checkbox>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workHistory: {
        deviceId: null,
        sensorId: null,
        userId: null,
        inputQuantity: null,
        targetQuantity: null,
        outputQuantity: null,
        qualityQuantity: null,
        defectiveQuantity: null,
        defectiveRate: null,
        stock: null,
        uptime: null,
        downtime: null,
        leadtime: null,
        color: null,
        ready: false,
        reset: null,
        operating: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.WorkHistory
    },
    inputMode() {
      return this.$store.getters.WorkHistoryInputMode
    },
    getCreatedAt() {
      return this.workHistory.createdAt && this.workHistory.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.workHistory = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.workHistory = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('actWorkHistoryInsert', this.workHistory)
    },
    onReady() {
      this.$store.dispatch('actWorkHistoryReady', { id: this.workHistoryList.id, ready: this.ready })
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
