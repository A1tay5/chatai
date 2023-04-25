import { defineStore } from 'pinia'

const useconfigStore = defineStore('config', {
  persist: true,
  state: () => {
    return {
      client: {
        package_name: 'web',
        aid: '',
        device_id: '',
        invite_code: '',
        os: 'web'
      }
    }
  }
})

export default useconfigStore
