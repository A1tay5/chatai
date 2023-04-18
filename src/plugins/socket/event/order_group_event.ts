import { store } from '@/store/index'

/**
 * @description: 用户下单头像
 * @param {*}
 * @return {*}
 */
class OrderGroupEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch('socket/PUSH_GROUP_ORDER',this.data)
  }
}

export default OrderGroupEvent