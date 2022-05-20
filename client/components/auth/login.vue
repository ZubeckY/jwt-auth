<template>
  <v-card class="form-card form-wrapper">
    <v-form @submit.prevent class="form-container">
      <header class="form-header">
        <h2>Вход</h2>
      </header>
      <div>
        <v-text-field
          label="Логин (Телефон)"
          v-model="submitModel.login"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="submitModel.password"
          label="Пароль"
          :rules="[rules.required, rules.min]"
          :type="showPass ? 'text' : 'password'"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
        ></v-text-field>
      </div>
      <v-row style="margin-top: 20px">
        <v-col>
          <span>Нет аккаунта?</span>
          <v-btn text href="/auth-regist"> Регистрация</v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn text @click="SubmitLogin">Войти</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component
export default class Login extends Vue {
  submitModel:any = {
    login: '',
    password: '',
  }
  showPass:boolean = false
  rules:any = {
    required: (value:any) => !!value || 'Обязательное поле.',
    min: (value:any) => value.length >= 8 || 'Минимум 8 символов',
  }
  async SubmitLogin () {
    let {login, password} = this.submitModel
    let data = await this.$rest.getAuth(login, password)
    this.Redirect ()
  }
  Redirect () {
    this.$router.push('/')
  }
}
</script>
<style>
  .form-card      {display: flex; padding: 20px; width: 800px; height: 310px; flex-direction: column; opacity: .85 !important;}
  .form-header    {margin: 30px 0 0 0; text-align: center;}
  .form-container {display: flex; width: 80%; align-self: center; flex-direction: column;}
</style>
