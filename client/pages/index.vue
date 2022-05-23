<template>
  <div>
    <div v-if="data">
      <h2>
        Агенства
      </h2>
      <Agencies
        :data="data"
      />
    </div>
    <div v-else>
      Подождите...
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
@Component
export default class Index extends Vue {
  private data:any = ''

  created () {
    if (!this.$restAuthData?.accessToken) {
      this.$router.push('/auth-login')
    } else {
      this.getUsers ()
    }
  }

  async getUsers () {
    let data = await this.$rest.users.list()
    this.data = data
  }
}
</script>
<style></style>
