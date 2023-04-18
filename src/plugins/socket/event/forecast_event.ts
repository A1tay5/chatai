import { store } from '@/store/index'

/**
 * @description: 图表红绿线
 * @param {*}
 * @return {*}
 */
class ForecastEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("socket/setForecast", this.data);
  }
}

export default ForecastEvent
