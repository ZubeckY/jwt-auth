<template>
  <v-container>
      <v-row style="background: #1867c0">
        <v-col>
          <v-card outlined :disabled="firstField">
            <v-form @submit.prevent>
              <div class="wrapper">
                <h2 class="text-center mb-20">Регистрация</h2>
                <v-text-field v-model="firstLogin" outlined @input="firstFormValidate"/>
                <v-text-field v-model="firstPass"  outlined :type="'password'" @input="firstFormValidate"/>
                <div class="ender">
                  <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModelFirst">Submit</v-btn>
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
                <v-text-field v-model="secondLogin" outlined/>
                <v-text-field v-model="secondPass"  outlined :type="'password'"/>
                <div class="starter">
                  <v-btn outlined color="#1867c0" class="ma-5" @click="changerFields">Sign up</v-btn>
                  <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModelSecond">Submit</v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
<!--    <div class="elem"></div>-->
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import SignForm from "~/components/sign-form.vue";
@Component({
  components: {SignForm}
})
export default class IndexPage extends Vue {
  firstField:boolean = false
  secondField:boolean = true

  firstLogin:string = ''
  firstPass:string = ''

  secondLogin:string = ''
  secondPass:string = ''

  submitModelFirst:boolean = true
  submitModelSecond:boolean = true

  changerFields () {
    this.firstField = !this.firstField
    this.secondField = !this.secondField
  }

  firstFormValidate  () {(this.firstLogin != '' && this.firstPass != '') ? this.submitModelFirst = false : this.submitModelFirst = true}
  secondFormValidate () {(this.secondLogin != '' && this.secondPass != '') ? this.submitModelSecond = false : this.submitModelSecond = true}



}
</script>

<style>
.container   { max-width: 1000px !important;}
.text-center {text-align: center;}
.wrapper     { margin: 30px;}
.ender       { display: flex; justify-content: end;}
.starter     { display: flex; justify-content: start;}
.ma-5        { margin: 0 5px;}
.mb-20       { margin-bottom: 20px;}
.elem        {
  //position: absolute;
  top: 0; width: 480px; height: 340px; background: #1867c0;}
</style>
