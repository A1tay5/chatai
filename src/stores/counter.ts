import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      active: 0
    }
  }
})

export default useCounterStore
