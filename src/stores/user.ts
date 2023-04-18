import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      userId: null,
      chatNum: 3
    }
  }
})

export default useUserStore
