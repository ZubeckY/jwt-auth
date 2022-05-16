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
  private $cookies:any
  private data:any = ''

  created () {
    const cookieRes = this.$cookies.get('refreshToken')
    cookieRes ? console.log('Authorization-OK') : this.$router.push('/auth-sign')
  }

  getUsers () {
    this.$axios.get('http://localhost:5000/auth/get-all', {
      withCredentials: true,
    })
    .then(responce => {
      this.data = responce.data
    })
    .catch(error=> {
      console.log(error)
    })
  }
}
</script>
<style></style>
