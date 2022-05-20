<template>
  <div class="wrapper">
    <v-container class="auth-aligner">
      <auth-regist/>
    </v-container>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
@Component
export default class AuthRegistPage extends Vue {

  // Поля контакта, которые хранятся в нашей табличке:

  ContactTable:any = {
    fName: '',                    // ф
    sName: '',                    // и
    pName: '',                    // о
    phone: '',                    // телефон
    IdAgency: '',                 // ID агентства, к которому привязан клиент
    bindingStatus: 'свободен',    // статус (свободен, не проверенное агентство, застройщик или агентство)
    IdRealtor: '',                // id риэлтора
    // Другая информация которая будет храниться
      fNameRealtor: '',             // ф риэлтора
      sNameRealtor: '',             // и риэлтора
      pNameRealtor: '',             // о риэлтора
      phoneRealtor: '',             // телефон риэлтора
  }

  // По каким критериям проверяется пользователь (по всем агентствам)
  ClientCheckTable:any = {
  // фамилия,
  // имя,
  // отчество,
  // телефон (обязательное)

  // Если клиент не найден или свободный, выводятся две кнопки:
  // «Закрепить клиента и зарегистрироваться как агентство»
  // или
  // «Авторизоваться и закрепить клиента»

  // При нажатии «Закрепить клиента и зарегистрироваться как агентство»
  // Статус у агентства ставится «не проверено».

  // При нажатии «Авторизоваться и закрепить клиента»
  // Выводится форма авторизации — логин и пароль агентства.
}
  Redirect () {
    this.$router.push('/')
  }
}
</script>
<style>
.wrapper {
  background: url("https://upload.wikimedia.org/wikipedia/commons/1/15/Mt._Everest_from_Gokyo_Ri_November_5%2C_2012.jpg") center no-repeat;
  width: 100%; height: 100vh; background-size: 100%;
}
.container    { max-width: 800px !important;}
.auth-aligner {display: flex; height: 100vh; align-items: center; justify-content: center;}
</style>
