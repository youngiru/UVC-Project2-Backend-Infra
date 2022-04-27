import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  Device: {
    id: null,
    name: null,
    location: null,
    edge_serial_number: null,
    newwork_interface: null,
    newwork_config: null,
    description: null,
    operating: null,
    ready_state: null,
    inspection: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    DeviceList: [],
    Device: { ...stateInit.Device },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DeviceList: state => state.DeviceList,
    Device: state => state.Device,
    DeviceInsertedResult: state => state.InsertedResult,
    DeviceUpdatedResult: state => state.UpdatedResult,
    DeviceDeletedResult: state => state.DeletedResult,
    DeviceInputMode: state => state.InputMode
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data
    },
    setDevice(state, data) {
      state.Device = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 기기 리스트 조회
    actDeviceList(context, payload) {
      // RestAPI 호출
      api
        .get('/serverApi/devices', { params: payload })
        .then(response => {
          const deviceList = response && response.data && response.data.rows
          context.commit('setDeviceList', deviceList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceList.error', error)
          context.commit('setDeviceList', [])
        })
    },

    // 기기 입력
    actDeviceInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      /* RestAPI 호출 */

      axios
        .post('/serverApi/devices', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          // console.log('insertedResult', insertedResult)
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 기기정보 초기화
    actDeviceInit(context, payload) {
      context.commit('setDevice', { ...stateInit.Device })
    },
    // 입력모드 설정
    actDeviceInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actDeviceInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDevice', { ...stateInit.Device })
      /* RestAPI 호출 */
      api
        .get(`/serverApi/devices/${payload}`)
        .then(response => {
          const device = response && response.data
          context.commit('setDevice', device)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceInfo.error', error)
          context.commit('setDevice', -1)
        })
    },
    // 기기 수정
    actDeviceUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)
      /* RestAPI 호출 */
      api
        .put(`/serverApi/devices/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    actDeviceDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)
      /* RestAPI 호출 */
      api
        .delete(`/serverApi/devices/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
