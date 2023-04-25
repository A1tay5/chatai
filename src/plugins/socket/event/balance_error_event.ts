// import { store } from '@/store/index'
import { Toast } from "vant"
import { store } from '@/store/index'
import { Dialog } from "vant";
import router from "@/router"

/**
 * @description: 异常
 * @param {*}
 * @return {*}
 */
class balanceErrorEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    Dialog.confirm({
      title: "Tips",
      message: this.data.msg,
      confirmButtonText: "Deposit",
      cancelButtonText: "Cancel",
    })
      .then(() => {
        // on confirm
        router.push({
          path: "/recharge",
          query: { source: 'homeTips' },
        });
      })
      .catch(() => {
        // on cancel
      });
    store.dispatch("socket/setTransactionBtnLoading", false); // 下单按钮loading
  }
}

export default balanceErrorEvent
