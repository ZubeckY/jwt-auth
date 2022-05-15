<template>
  <v-container>
      <v-row style="background: #1867c0">
        <v-col>
          <v-card outlined>
            <v-form @submit.prevent>
              <div class="wrapper">
                <h2 class="text-center mb-20">Регистрация</h2>
                <v-text-field outlined/>
                <v-text-field outlined :type="'password'"/>
                <div class="ender">
                  <v-btn outlined color="#1abc4d" class="ma-5">Submit</v-btn>
                  <v-btn outlined color="#1867c0" class="ma-5">Sign in</v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined>
            <v-form @submit.prevent>
              <div class="wrapper">
                <h2 class="text-center mb-20">Вход</h2>
                <v-text-field outlined/>
                <v-text-field outlined :type="'password'"/>
                <div class="starter">
                  <v-btn outlined color="#1867c0" class="ma-5">Sign up</v-btn>
                  <v-btn outlined color="#1abc4d" class="ma-5">Submit</v-btn>
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

@Component
export default class IndexPage extends Vue {

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
