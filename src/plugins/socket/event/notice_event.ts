import { store } from '@/store/index'
/**
 * @description: 新增通知
 * @param {*}
 * @return {*}
 */
class NoticeEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    store.dispatch("config/setNoticeFlag", true);
  }
}

export default NoticeEvent
