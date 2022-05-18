<template>
  <v-container>
      <v-row style="background: #1867c0; margin: 25% 0;">
        <v-col>
          <v-card outlined :disabled="firstField">
            <v-form @submit.prevent>
              <div class="wrapper">
                <h2 class="text-center mb-20">Регистрация</h2>
                <v-text-field v-model="firstLogin" placeholder="Login"    @input="firstFormValidate" outlined/>
                <v-text-field v-model="firstPass"  placeholder="Password" @input="firstFormValidate" outlined :type="'password'" />
                <div class="ender">
                  <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModelFirst" @click="SubmitRegist">Submit</v-btn>
                  <v-btn outlined color="#1867c0" class="ma-5" @click="changerFields">Sign in</v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined :disabled="secondField">
            <v-form @submit.prevent>
              <div class="wrapper">
                <h2 class="text-center mb-20">Вход</h2>
                <v-text-field v-model="secondLogin" placeholder="Login"    @input="secondFormValidate" outlined/>
                <v-text-field v-model="secondPass"  placeholder="Password" @input="secondFormValidate" outlined :type="'password'"/>
                <div class="starter">
                  <v-btn outlined color="#1867c0" class="ma-5" @click="changerFields">Sign up</v-btn>
                  <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModelSecond" @click="SubmitLogin">Submit</v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
<!--    <div class="elem"></div>-->

    <div>

      {{responceData}}
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import SignForm from "~/components/sign-form.vue";
@Component({
  components: {SignForm}
})
export default class AuthSign extends Vue {
  firstField:boolean = false
  secondField:boolean = true

  firstLogin:string = ''
  firstPass:string = ''

  secondLogin:string = ''
  secondPass:string = ''

  submitModelFirst:boolean = true
  submitModelSecond:boolean = true

  responceData:string = ''

  changerFields () {
    this.firstField = !this.firstField
    this.secondField = !this.secondField
  }

  firstFormValidate  () {(this.firstLogin != '' && this.firstPass != '') ? this.submitModelFirst = false : this.submitModelFirst = true}
  secondFormValidate () {(this.secondLogin != '' && this.secondPass != '') ? this.submitModelSecond = false : this.submitModelSecond = true}

  SubmitRegist () {
    this.$axios.post ('http://localhost:5000/auth/registration', {
      login: this.firstLogin,
      password: this.firstPass,
    })
    .then((response) => {
      this.responceData = response.data.refreshToken
      this.Redirect ()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async SubmitLogin  () {
    let data = await this.$rest.getAuth(this.secondLogin, this.secondPass)
    this.Redirect ()
  }

  Redirect () {
    this.$router.push('/')
  }

}
</script>

<style>
.container   { max-width: 1000px !important;}
.text-center { text-align: center;}
.wrapper     { margin: 30px;}
.ender       { display: flex; justify-content: end;}
.starter     { display: flex; justify-content: start;}
.ma-5        { margin: 0 5px;}
.mb-20       { margin-bottom: 20px;}
.elem        {
  //position: absolute;
  top: 0; width: 480px; height: 340px; background: #1867c0;}
</style>
