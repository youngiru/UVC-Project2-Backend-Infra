<template>
  <div>
    <app-header />
    <b-table class="factory_table" :items="factory" :fields="fields">
      <template #cell(temperature)="row">
        <b-button size="sm" variant="dark" class="mr-2" @click="onClickEdit(row.item.id)">ON</b-button>
        <b-button size="sm" variant="dark" class="mr-2" @click="onClickDelete(row.item.id)">OFF</b-button>
      </template>
      <template #cell(humidity)="row">
        <b-button size="sm" variant="dark" class="mr-2" @click="onClickEdit(row.item.id)">ON</b-button>
        <b-button size="sm" variant="dark" class="mr-2" @click="onClickDelete(row.item.id)">OFF</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'

export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: '공장'
        },
        {
          key: 'temperature',
          label: '온도계'
        },
        {
          key: 'humidity',
          label: '습도계'
        }
      ],
      factory: [
        { name: 1, temperature: '', humidity: '' },
        { name: 2, temperature: '', humidity: '' },
        { name: 3, temperature: '', humidity: '' }
      ]
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
