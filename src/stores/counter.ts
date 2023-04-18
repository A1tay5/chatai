import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  persist: true,
  state: () => {
    return {
      // step: localStorage.getItem('counter') || 0
      step: 0,
      week: null
    }
  }
})

export default useCounterStore
