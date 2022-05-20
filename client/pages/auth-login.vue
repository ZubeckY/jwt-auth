<template>
  <div class="wrapper">
    <v-container class="auth-aligner">
      <auth-login/>
    </v-container>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
@Component
export default class AuthLoginPage extends Vue {}
</script>
<style>
.wrapper {
  background: url("https://upload.wikimedia.org/wikipedia/commons/1/15/Mt._Everest_from_Gokyo_Ri_November_5%2C_2012.jpg") center no-repeat;
  width: 100%; height: 100vh; background-size: 100%;
}
.container    { max-width: 800px !important;}
.auth-aligner {display: flex; height: 100vh; align-items: center; justify-content: center;}
</style>
