import { defineStore } from 'pinia'

const useChatStore = defineStore('chat', {
  state: () => {
    return {
      chatObj: null
    }
  },
  actions: {
    updatechatObj(val: any) {
      setTimeout(() => {
        this.chatObj = val
      })
    }
  }
})

export default useChatStore
