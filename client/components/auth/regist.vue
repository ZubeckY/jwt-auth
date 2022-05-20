<template>
  <v-card
    class="mx-auto"
    style="padding: 20px 70px; opacity: .85 !important;"
    width="800"
  >
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
            label="Организация"
            v-model="AgencyModel.nameAgency"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Введите название вашей организации
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            label="Фамилия"
            v-model="AgencyModel.fNameDirector"
          ></v-text-field>
          <v-text-field
            label="Имя"
            v-model="AgencyModel.sNameDirector"
          ></v-text-field>
          <v-text-field
            label="Отчество"
            v-model="AgencyModel.pNameDirector"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Введите ФИО Руководителя
          </span>
        </v-card-text>
      </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field
              label="Email"
              v-model="AgencyModel.emailAgency"
            ></v-text-field>
            <v-text-field
              label="Телефон"
              v-model="AgencyModel.phoneAgency"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
            Введите контактные данные Вашей организации
          </span>
          </v-card-text>
        </v-window-item>

      <v-window-item :value="4">
        <v-card-text>
          <v-text-field
            label="ФИО сотрудника"
            v-model="AgencyModel.contactFaceAgencyFIO"
          ></v-text-field>
          <v-text-field
            label="Телефон"
            v-model="AgencyModel.contactFaceAgencyPhone"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Введите данные Вашего контактного лица
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="5">
        <v-card-text>
          <v-text-field
            label="Пароль"
            v-model="password"
            :rules="[rules.required, rules.min]"
            :type="showPass1 ? 'text' : 'password'"
            :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass1 = !showPass1"
          ></v-text-field>
          <v-text-field
            label="Повторите пароль"
            v-model="passwordRepeat"
            :rules="[rules.required, rules.min]"
            :type="showPass2 ? 'text' : 'password'"
            :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass2 = !showPass2"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Пожалуйста, введите ваш пароль
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="6">
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
            @click="step--"
            :href="step === 1 ? '/auth-login' : ''"
          >
            {{ (step === 1) ? "Войти" : (step === 6) ? '' : 'Назад'}}
          </v-btn>
        </v-col>
        <v-col class="col-auto">
          <v-btn
            :disabled="step === 6"
            depressed
            text
            @click="Checker"
          >
            {{ step === 5 ? "Регистрация" : (step === 6) ? '' : 'Далее'}}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component
export default class AuthRegist extends Vue {
  step:number = 1
  showPass1:boolean = false
  showPass2:boolean = false

  password:string = ''
  passwordRepeat:string = ''

  AgencyModel:any = {
    //При регистрации
    nameAgency: '',             // название агенства

    fNameDirector: '',          // ф директора
    sNameDirector: '',          // и директора
    pNameDirector: '',          // о директора

    phoneAgency: '',            // телефон агентства
    emailAgency: '',            // емаил агентства

    commentAgency: '',          // комментарий

    contactFaceAgencyID: '',    // ID Сотрудника для связи (привязывется к организации, т.к. поле может быть не постоянным, сделал так)
    // Другая информация которая будет храниться
    contactFaceAgencyFIO: '',   // ф сотрудника агентства для связи
    contactFaceAgencyPhone: '', // о сотрудника агентства для связи

    passwordAgency: '',         // пароль

    clientBaseIDs: '',          // ID-шники клиентов, привязанных к конкретному Агенству
  }

  rules:any = {
    required: (value:any) => !!value || 'Обязательное поле.',
    min: (value:any) => value.length >= 8 || 'Минимум 8 символов',
  }

  Checker () {
    this.step++
    if (this.step == 6) {
      console.log(this.AgencyModel)
    }
  }

  get currentTitle () {
    switch (this.step) {
      case 1:
        return 'Название организации'
      case 2:
        return 'Руководитель'
      case 3:
        return 'Контакты'
      case 4:
        return 'Контактное лицо'
      case 5:
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
