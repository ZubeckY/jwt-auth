<template>
  <div>
    <v-container style="max-width: 1500px !important; margin-top: 40px;">
      <div v-if="data">
        <v-row style="margin: 40px">
          <v-col>
            <h2>Агенства</h2>
          </v-col>
          <v-col class="col-auto" data-app>
            <template>
              <div class="text-center">
                <v-dialog
                  width="500"
                  v-model="dialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-on="on"
                      v-bind="attrs"
                    >
                      Проверить контакт
                    </v-btn>
                  </template>
                  <v-card light>
                    <v-card-title class="text-h5 lighten-2">
                      Проверить контакт
                    </v-card-title>
                    <v-card-text>
                      <v-text-field/>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div v-if="!result">
                        <v-btn text @click="result=!result">
                          Проверить
                        </v-btn>
                      </div>
                      <div v-else>
                        <p><strong>Если контакт не найден:</strong> «Клиента в базе нет, авторизуйтесь или зарегистрируйтесь, чтобы закрепить за собой».</p>
                        <p><strong>Если контакт найден и свободный:</strong>«Клиент в базе есть, но свободный. Авторизуйтесь или зарегистрируйтесь, чтобы закрепить за собой».</p>
                        <p><strong>Если контакт найден и занят:</strong>«Клиент найден в базе! Для того, чтобы сделка с данным клиентом была ваша, требуется прийти вместе с ним на сделку!»</p>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-col>
        </v-row>
        <Agencies :data="data"/>
      </div>
      <div v-else>Подождите...</div>
    </v-container>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
@Component
export default class Index extends Vue {
  private data:any = ''
  private dialog:boolean = false
  private result:boolean = false

  created () {
    if (!this.$restAuthData?.accessToken) {
      this.$router.push('/auth-login')
    } else {
      this.getUsers ()
    }
  }

  async getUsers () {
    let data = await this.$rest.users.list()
    this.data = data
  }
}
</script>
<style></style>
