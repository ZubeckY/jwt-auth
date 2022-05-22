import Vue from 'vue'
import axios from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $restAuthData: AuthData
    $rest: Rest
  }
}

abstract class BaseModule {
  constructor(protected rest:Rest) {
  }
}


class UsersModule extends BaseModule {
  private url = '/get-all/'

  public async list(): Promise<any> {

    return await this.rest.get(`${this.url}`, {
    })
  }
}

class Rest {
  public users: UsersModule;

  constructor() {
    this.users = new UsersModule (this)
  }

  private static hostname = '/api'
  private static getTokenUrl = '/api/auth/login/'
  private static regTokenUrl = '/api/auth/registration/'

  public token = ''

  public getAuth = async (data:any) => {
    // : AuthData | false
    const response = await axios.post(Rest.getTokenUrl, data)
    // .then(response => (Vue.prototype.$restAuthData = response.data))
    Vue.prototype.$restAuthData = response.data
    this.token = response.data.accessToken
    return response.data
  }

  public regAuth = async (data:any) => {
    // : AuthData | false
    const response = await axios.post(Rest.regTokenUrl, data)
    // .then(response => (Vue.prototype.$restAuthData = response.data))
    Vue.prototype.$restAuthData = response.data
    this.token = response.data.accessToken
    return response.data
  }

  public post = async (url: string, data: object) => {
    if (!this.token) {
      return false
    }
    const response = await axios.post(Rest.hostname + url, data, {
      headers: { Authorization: `${this.token}` },
    })
    return response.data
  }

  public get = async (url: string, data: object) => {
    if (!this.token) {
      return false
    }

    const response = await axios.get(Rest.hostname + url, {
      ...data,
      headers: { Authorization: `${this.token}` },
    })

    return response.data
  }



}

const rest = new Rest()
Vue.prototype.$rest = rest
