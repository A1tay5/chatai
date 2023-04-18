// import { store } from '@/store/index'
import { Toast } from "vant"
import { store } from '@/store/index'
/**
 * @description: 异常
 * @param {*}
 * @return {*}
 */
class AbnormalEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("socket/setTransactionBtnLoading", false); // 下单按钮loading
    Toast.fail(this.data.msg.msg || this.data.msg || '异常');
  }
}

export default AbnormalEvent
