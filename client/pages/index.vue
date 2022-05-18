<template>
  <div>
    <div v-if="data == ''">
      <v-btn @click="getUsers"> Получить Всех Пользователей </v-btn>
    </div>
    <div v-else v-for="el in data">
      <div>
        <div>id : {{el._id}}</div>
        <div>Login : {{el.login}}</div>
        <div>Data : {{el.createdAt}}</div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
@Component
export default class Index extends Vue {
  private data:any = ''

  titles:any=[
    {
      title: 'Вход'
    },
    {
      title: 'Регистрация'
    }
  ]

  created () {
    if (!this.$restAuthData?.accessToken) {
      console.log(this.$restAuthData)
      this.$router.push('/auth-sign')
    }
  }

  getUsers () {
    this.$rest.users.list()
  }
}
</script>
<style></style>
