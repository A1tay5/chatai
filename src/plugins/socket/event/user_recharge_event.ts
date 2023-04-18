import { Toast } from "vant"
import { store } from '@/store/index'
import { emitFirebaseEvent, FBPurchase } from "@/utils/firebase"; // 事件埋点
import { useI18n } from "vue-i18n";
import i18n from "@/language/index"
import socketInstance from "@/plugins/socket/socket-instance";

/**
 * @description: 充值成功
 * @param {*}
 * @return {*}
 */
class UserRechargeEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    // Toast('FBPurchase success' + this.data.amount + "INR")
    // FBPurchase(this.data.amount, "INR")
    // socketInstance.send({ data: { event: 'event_user_recharge', data: { pay_id: this.data.id } } })
    // alert('FBPurchase success' + this.data.amount + "INR")
    // emitFirebaseEvent(`switch_rechargeResult___true`); // 事件埋点
  }
}

export default UserRechargeEvent
