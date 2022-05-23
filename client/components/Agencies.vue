<template>
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </template>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class Agencies extends Vue {
  @Prop () data!:any
  headers:any = [
    { text: 'Id', value: '_id' },
    { text: 'Название организации', value: 'name'},
    { text: 'ФИО Директора', value: 'director'},
    { text: 'Телефон организации', value: 'phone'},
    { text: 'E-mail', value: 'email'},
    { text: 'Комментарий', value: 'comment'},
    { text: 'Контактное лицо', value: 'contactname'},
    { text: 'Контактный телефон', value: 'contactphone'},
    { text: 'Дата создания', value: 'createdAt'},
  ]

}
</script>

