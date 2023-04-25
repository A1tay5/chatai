import { store } from '@/store/index'
import BaseMethod from "@/uitls/baseMethod";

/**
 * @description: 货币列表
 * @param {*}
 * @return {*}
 */
class MarketRowEvent {
  data: any
  $mittBus: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    // 设置货币列表
    // store.dispatch("socket/setBusinessConfig", this.data);
    // 更新当前货币数据
    this.data.forEach((item: { id: any }) => {
      if (store.state.socket.currency["id"] == item.id) {
        store.dispatch("socket/setCurrency", item);
        return;
      }
    });
    // 设置货币
    BaseMethod.getBusinessConfig()
  }
}

export default MarketRowEvent
