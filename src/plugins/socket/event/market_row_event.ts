import { store } from '@/store/index'

/**
 * @description: 业务切换
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
    store.dispatch("socket/setLastRow", this.data)
    let formatData = { ...this.data }
    const lineConfig = { 3: 0.5, 15: 5, 30: 10, 60: 15 };
    let sharp = store.state.socket.sharp
    let step = store.state.socket.step;
    let lastValue = { ...store.state.socket.lineData[store.state.socket.lineData.length - 1] };

    let level = store.state.socket.step;
    if (sharp === 'line') {
      level = lineConfig[step];
    }

    // if (level == 1) {
    //   return store.dispatch("socket/setLastFormartRow", formatData)
    // } else {
    //   let t = Math.floor(formatData[0] / 1000 / level) * 1000 * level
    //   formatData[0] = t;
    //   if (lastValue[0] < t) {
    //     return store.dispatch("socket/setLastFormartRow", formatData)
    //   } else if (lastValue[0] == t) {
    //     formatData[1] = lastValue[1]
    //     formatData[3] = lastValue[3] < formatData[2] ? lastValue[3] : formatData[2]
    //     formatData[4] = lastValue[4] > formatData[2] ? lastValue[4] : formatData[2]
    //     return store.dispatch("socket/setLastFormartRow", formatData)
    //   }
    // }

    if (level == 0.5) {
      store.dispatch("socket/updateLineData", formatData);
      return store.dispatch("socket/setLastFormartRow", formatData)
    } else {
      let t = Math.floor(formatData[0] / 500 / level) * 500 * level;
      formatData[0] = t;
      if (lastValue[0] < t) {
        store.dispatch("socket/updateLineData", formatData);
        return store.dispatch("socket/setLastFormartRow", formatData)
      } else if (lastValue[0] == t) {
        formatData[1] = lastValue[1]
        formatData[3] = lastValue[3] < formatData[2] ? lastValue[3] : formatData[2]
        formatData[4] = lastValue[4] > formatData[2] ? lastValue[4] : formatData[2]
        store.dispatch("socket/updateLineData", formatData);
        return store.dispatch("socket/setLastFormartRow", formatData)
      }
    }
  }
}

export default MarketRowEvent
