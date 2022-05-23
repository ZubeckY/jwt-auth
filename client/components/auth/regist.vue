<template>
  <v-card
    class="mx-auto"
    style="padding: 20px 70px; opacity: .85 !important;"
    width="800"
  >
    <v-form lazy-validation @submit.prevent>
      <header class="form-header">
        <h2>Регистрация</h2>
      </header>
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
        ></v-avatar>
      </v-card-title>
      <v-window v-model="step">

        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Организация *"
              v-model="Agency.name"
              required
            ></v-text-field>
            <v-text-field
              label="ФИО Руководителя *"
              v-model="Agency.director"
              required
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
            Введите название Вашей организации и ФИО руководителя
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Email *"
              v-model="Agency.email"
              required
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
              label="Телефон *"
              v-model="Agency.phone"
              required
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Комментарий"
              v-model="Agency.comment"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
            Введите контактные данные организации
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field
              label="ФИО сотрудника"
              v-model="Agency.contactname"
            ></v-text-field>
            <v-text-field
              label="Телефон"
              v-model="Agency.contactphone"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
            Введите данные контактного лица
          </span>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="4">
          <v-card-text>
            <v-text-field
              label="Пароль *"
              v-model="password"
              required
              :rules="[rules.required,rules.min,rules.password]"
              :type="showPass1 ? 'text' : 'password'"
              :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass1 = !showPass1"
            ></v-text-field>
            <v-text-field
              label="Повторите пароль *"
              v-model="passwordRepeat"
              required
              :rules="[rules.required,rules.min,rules.password]"
              :type="showPass2 ? 'text' : 'password'"
              :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass2 = !showPass2"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
            Пожалуйста, введите пароль
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="5">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              width="500"
              height="128"
              src="https://everest24.ru/local/templates/everest_templ/images/logo_b1.png"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Добро пожаловать в Эверест
            </h3>
            <span class="text-caption grey--text">Спасибо за регистрацию, сейчас будет переход на основную страницу</span>
          </div>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row style="margin-top: 20px">
          <v-col>
            <span v-if="step === 1">Есть аккаунт?</span>
            <v-btn
              text
              @click="backStep"
              :href="step === 1 ? '/auth-login' : ''"
            >
              {{ (step === 1) ? "Войти" : (step === 5) ? '' : 'Назад'}}
            </v-btn>
          </v-col>
          <v-col class="col-auto">
            <v-btn
              :disabled="isValid"
              depressed text
              @click="Checker"
            >
              {{ step === 4 ? "Регистрация" : (step === 5) ? '' : 'Далее'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component
export default class AuthRegist extends Vue {
  step:number = 1
  showPass1:boolean = false
  showPass2:boolean = false
  isValid:boolean=false
  password:string = ''
  passwordRepeat:string = ''
  Agency:any = {
    name: '', director: '', phone: '', email: '', comment: '', contactname: '', contactphone: '', password: '',
  }
  rules:any = {
    required: (value:any) => !!value || 'Обязательное поле.',
    min: (value:any) => value.length >= 8 || 'Минимум 8 символов',
    password: (value:any) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value) || 'Пароль должен содержать как минимум строчную букву, одну цифру, специальный символ и одну прописную букву',
    email: (value:any) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'не корректный E-mail',
  }
  backStep () {
    this.step--
    this.isValid = false
  }
  async Checker () {
    this.step++
    if (this.step == 5) {
      this.Agency.password = this.password
      this.Agency.name = this.Agency.name.toLowerCase()
      this.Agency.director = this.Agency.director.toLowerCase()
      this.Agency.email = this.Agency.email.toLowerCase()
      this.Agency.comment = this.Agency.comment.toLowerCase()
      this.Agency.contactname = this.Agency.contactname.toLowerCase()
      let data = await this.$rest.regAuth (this.Agency)
      this.Redirect ()
    }
  }
  Redirect () {
    this.$router.push('/')
  }
  get currentTitle () {
    switch (this.step) {
      case 1:
        this.isValid=true
        return 'Название организации'
      case 2:
        this.isValid=true
        return 'Контакты'
      case 3:
        this.isValid=false
        return 'Контактное лицо'
      case 4:
        this.isValid=true
        return 'Пароль'
      default:
        return 'Аккаунт создан'
    }
  }
}
</script>

<style>
.text-center  {text-align: center;}
</style>
