import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      userInfo: {
        customerId: null
      },
      chatNum: 5,
      token: ''
    }
  }
})

export default useUserStore
