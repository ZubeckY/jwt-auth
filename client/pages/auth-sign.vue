<template>
  <div class="wrapper">
      <v-form @submit.prevent class="form-container">
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
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
@Component
export default class AuthSign extends Vue {
  login:string = ''
  password:string = ''
  showPass:boolean = false

  async SubmitLogin  () {
    let data = await this.$rest.getAuth(this.login, this.password)
    this.Redirect ()
  }

  Redirect () {
    this.$router.push('/')
  }
  rules:any = {
    required: value => !!value || 'Обязательное поле.',
    min: v => v.length >= 8 || 'Минимум 8 символов',
    loginMatch: () => (`The login and password you entered don't match`),
  }

}
</script>

<style>
.container   { max-width: 1000px !important;}
.wrapper {
  width: 100%;
  height: 100vh;
  background: url("./static/andreas-gabler-XEW_Wd4240c-unsplash.png") center no-repeat;
  background-size: 100%;
  filter: contrast(175%) brightness(85%) saturate(85%);
}
.form-header {
  margin: 30px 0 0 0;
  text-align: center;
}
.form-wrapper {
  background: #fff;
  filter: unset;
  padding: 20px;
}
.form-container {
  display: flex;
  width: 80%;
  margin: 10px auto;
  flex-direction: column;
}
</style>
