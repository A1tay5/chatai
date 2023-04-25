import { Notify } from 'vant';

import { Toast } from "vant"
import { store } from '@/store/index'
import socketInstance from "@/plugins/socket/socket-instance";
/**
 * @description: 异常
 * @param {*}
 * @return {*}
 */
class CloseEvent {
  data: any
  Notify:any
  constructor(data: any) {
    this.Notify = Notify
    this.data = data
  }
  handle() {
    store.dispatch("userData/setRealUser", {});
		// store.dispatch("config/setRealToken", '');
		store.dispatch("config/setAccountType", "demo");
    socketInstance.close(socketInstance.connect())
  }
}

export default CloseEvent
