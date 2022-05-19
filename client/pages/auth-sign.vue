<template>
  <div class="wrapper">
    <v-container>
      <v-card class="form-card form-wrapper">
        <auth-login
          @Submit="Submit"
        />
      </v-card>
    </v-container>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
@Component
export default class AuthSign extends Vue {
  login:string = ''
  password:string = ''
  async Submit (submit) {
    if (submit.formType == '')
    let data = await this.$rest.getAuth(this.login, this.password)
    this.Redirect ()
  }
  Redirect () {
    this.$router.push('/')
  }
}
</script>
<style>
.container   { max-width: 1000px !important;}
.wrapper {
  width: 100%; height: 100vh;
  background: url("./static/andreas-gabler-XEW_Wd4240c-unsplash.png") center no-repeat;
  background-size: 100%; filter: contrast(175%) brightness(85%) saturate(85%);
}
.form-header {
  margin: 30px 0 0 0; text-align: center;
}
.form-wrapper {
  filter: unset; padding: 20px;
}
.form-card {
  display: flex; flex-direction: column; margin: 25% 0;
}
.form-container {
  display: flex; width: 80%; height: 400px; align-self: center; flex-direction: column;
}
</style>
