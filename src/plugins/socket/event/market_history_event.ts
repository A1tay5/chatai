import { store } from '@/store/index'


/**
 * @description: 业务切换
 * @param {*}
 * @return {*}
 */
class MarketHistoryEvent {
  data: any
  $mittBus: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("socket/LIST_CONCAT_ACTION", this.data)
    // klineChart.KLDOM.applyNewData(store.state.klineCharts.list);
    // console.log(klineChart.formatChartData(store.state.klineCharts.list));
    // klineChart.KLDOM.applyNewData(store.getters["klineCharts/formatChartData"]);
    // console.log(store.state.klineCharts.list);
    // console.log(store.getters["klineCharts/formatChartData"]);
  }
}

export default MarketHistoryEvent
