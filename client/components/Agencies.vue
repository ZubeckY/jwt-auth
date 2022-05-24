<template>
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.Toggle="{ item }">
          <v-sheet style="overflow: hidden">
            <v-container class="fill-height">
              <v-row style="justify-content: center;">
                <v-btn width="100%" @click.stop="drawer = !drawer">
                  Показать
                </v-btn>
              </v-row>
            </v-container>
            <v-navigation-drawer
              width="800"
              v-model="drawer"
              absolute temporary center right
            >
              <div>
                <div>
                  <v-btn>Проверить контакт</v-btn>
                </div>
                <div>
                  <h2>
                    Мамонты (ой, контакты)
                  </h2>
                </div>
              </div>
            </v-navigation-drawer>
          </v-sheet>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class Agencies extends Vue {
  @Prop () data!:any
  drawer:boolean=false
  headers:any = [
    { text: 'Название организации', value: 'name'},
    { text: 'ФИО Директора', value: 'director'},
    { text: 'Телефон агентства', value: 'phone'},
    { text: 'E-mail', value: 'email'},
    { text: 'Комментарий', value: 'comment'},
    { text: 'Контактное лицо', value: 'contactname'},
    { text: 'Контактный телефон', value: 'contactphone'},
    { text: 'Привязанные контакты', value: 'Toggle'},
  ]
}
</script>

