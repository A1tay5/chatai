import { store } from '@/store/index'
import socketInstance from "@/plugins/socket/socket-instance";

/**
 * @description: 连接
 * @param {*}
 * @return {*}
 */
class BindEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    if (store.state.socket.currency["id"]) {
      this.init()
    } else {
      setTimeout(() => {
        this.handle()
      }, 200);
    }
  }
  init() {
    store.dispatch("socket/setLineData", []); // 设置默认时间段
    socketInstance.emit("event_market_init", {
      event: "event_market_init",
      data: {
        business_id: store.state.socket.currency["id"],
        type: "demo",
        sharp: store.state.socket.sharp,
        step: store.state.socket.step,
      },
    });
  }
}

export default BindEvent
