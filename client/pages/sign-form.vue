<template>
  <v-card outlined :disabled="Field">
    <v-form @submit.prevent>
      <div class="wrapper">
        <h2 class="text-center mb-20">title</h2>
        <v-text-field v-model="Login" placeholder="Login" @input="FormValidate" outlined :rules="rules"/>

        <v-text-field v-model="Pass" placeholder="Password" @input="FormValidate" outlined
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1" :rules="rules"

        ></v-text-field>
        <div class="ender">
          <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModel" @click="Submit">Submit</v-btn>
          <v-btn outlined color="#1867c0" class="ma-5" @click="changerFields">Sign in</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class SignForm extends Vue {
  // @Prop


  // Field
  // Login
  // Pass
  // whoIsForm
  // title
  //signToggle

  show1:boolean = false
  rules:any = [
    value => !!value || 'Required.',
    value => (value && value.length >= 3) || 'Min 3 characters',
  ]

  FormValidate () {

  }

  Submit () {

  }

  changerFields () {

  }


}

</script>

<style scoped>

</style>
