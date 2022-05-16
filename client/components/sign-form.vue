<template>
  <v-card outlined :disabled="numberField">
    <v-form @submit.prevent>
      <div class="wrapper">
        <h2 class="text-center mb-20"> {{ titleCard }} </h2>
        <v-text-field outlined/>
        <v-text-field outlined :type="'password'"/>
        <div class="ender">
          <v-btn outlined color="#1abc4d" class="ma-5" :disabled="submitModel">Submit</v-btn>
          <v-btn outlined color="#1867c0" class="ma-5" @click="$emit ('changerField')">Sign in</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"

@Component
export default class SignForm extends Vue {
  @Prop
  titleCard:any
  numberField:boolean
}

</script>

<style scoped>

</style>
