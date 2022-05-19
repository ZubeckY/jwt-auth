<template>
  <v-form @submit.prevent class="form-container">
    <header class="form-header">
      <h2>Авторизация</h2>
    </header>
    <v-text-field
      v-model="login"
      label="Логин"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="password"
      label="Пароль"
      :rules="[rules.required, rules.min]"
      :type="showPass ? 'text' : 'password'"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPass = !showPass"
    ></v-text-field>
    <v-checkbox
      style="margin: 20px 5px 20px auto"
      label="Войти как организация"
      color="#1867c0 !important"
      value="primary"
      hide-details
    ></v-checkbox>
    <v-row>
      <v-col>
        <v-btn>Войти</v-btn>
      </v-col>
      <v-col class="col-auto">
        <span>У вас нет аккаунта?</span>
        <v-btn text> Зарегестрироваться</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
@Component
export default class Login extends Vue {
  login:string = ''
  password:string = ''

  showPass:boolean = false
  rules:any = {
    required: value => !!value || 'Обязательное поле.',
    min: v => v.length >= 8 || 'Минимум 8 символов',
    loginMatch: () => (`The login and password you entered don't match`),
  }
}
</script>
