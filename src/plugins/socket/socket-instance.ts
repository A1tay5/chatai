import { store } from '@/store/index'
// import config from '@/config/config'
import WsSocket from '@/plugins/socket/ws-socket'
// import { getToken } from '@/utils/auth'
import { Local } from '@/uitls/storage'
// 引入消息处理类

import event_market_row from '@/plugins/socket/event/market_row_event' // 业务切换
import event_market_init from '@/plugins/socket/event/market_init_event' // 业务切换
import event_order_create from '@/plugins/socket/event/order_create_event' // 新订单
import event_order_result from '@/plugins/socket/event/order_result_event' // 交易结果
import event_abnormal from '@/plugins/socket/event/abnormal_event' // 异常
import event_real_user from '@/plugins/socket/event/real_user_event' // 真实用户信息
import event_demo_user from '@/plugins/socket/event/demo_user_event' // demo用户信息
import event_bind from '@/plugins/socket/event/bind_event' // 连接
import event_market_config from '@/plugins/socket/event/market_config_event' // 业务设置更新
import event_balance_error from '@/plugins/socket/event/balance_error_event' // 下单金额不够提示
import event_login_error from '@/plugins/socket/event/login_error_event' // 下单金额不够提示
import event_market_history from '@/plugins/socket/event/market_history_event' // 追加历史数据
import event_order_group from '@/plugins/socket/event/order_group_event' // 用户下单头像
import event_user_recharge from '@/plugins/socket/event/user_recharge_event' // 充值成功
import event_loading_order from '@/plugins/socket/event/loading_order_event' // 初始化订单
import event_notice from '@/plugins/socket/event/notice_event' // 新增通知
import event_forecast from '@/plugins/socket/event/forecast_event' // 新增通知

// /**
//  * SocketInstance 连接实例
//  *
//  * 注释: 所有 WebSocket 消息接收处理在此实例中处理
//  */
class SocketInstance {
  /**
   * WsSocket 实例
   */
  socket?: any
  path?: string
  /**
   * SocketInstance 初始化实例
   */
  constructor() {
    this.path = `${import.meta.env.VITE_WS_URL}?token=${
      store.state.config.account_type == 'demo'
        ? store.state.config.demo_token
        : store.state.config.real_token
    }`
    this.socket = new WsSocket(
      () => {
        return this.path
      },
      {
        onError: (evt?: any) => {
          console.log('Websocket callback fail')
        },
        // Websocket 连接成功回调方法
        onOpen: (evt?: any) => {
          this.updateSocketStatus(true)
        },
        // Websocket 断开连接回调方法
        onClose: (evt?: any) => {
          this.updateSocketStatus(false)
        },
      }
    )
    console.log(this.socket, this.path)

    this.registerEvents()
  }

  // 连接 WebSocket 服务
  connect() {
    console.log(this.socket)

    const token =
      store.state.config.account_type == 'demo'
        ? store.state.config.demo_token
        : store.state.config.real_token
    if (token == '') {
      setTimeout(() => {
        this.connect()
      }, 1000)
      return
    }
    this.path = `${import.meta.env.VITE_WS_URL}?token=${token}`
    this.socket.connection()
  }

  /**
   * 注册回调消息处理事件
   */
  registerEvents() {
    this.socket
      .on('event_market_row', (data?: any) => {
        new event_market_row(data).handle()
      })
      .on('event_market_init', (data?: any) => {
        new event_market_init(data).handle()
      })
      .on('event_order_create', (data?: any) => {
        new event_order_create(data).handle()
      })
      .on('event_order_result', (data?: any) => {
        new event_order_result(data).handle()
      })
      .on('event_abnormal', (data?: any) => {
        new event_abnormal(data).handle()
      })
      .on('event_real_user', (data?: any) => {
        new event_real_user(data).handle()
      })
      .on('event_demo_user', (data) => {
        new event_demo_user(data).handle()
      })
      .on('event_bind', (data?: any) => {
        new event_bind(data).handle()
      })
      .on('event_market_config', (data?: any) => {
        new event_market_config(data).handle()
      })
      .on('event_balance_error', (data?: any) => {
        new event_balance_error(data).handle()
      })
      .on('event_login_error', (data) => {
        new event_login_error(data).handle()
      })
      .on('event_market_history', (data?: any) => {
        new event_market_history(data).handle()
      })
      .on('event_order_group', (data?: any) => {
        new event_order_group(data).handle()
      })
      .on('event_loading_order', (data?: any) => {
        new event_loading_order(data).handle()
      })
      .on('event_close', (data?: any) => {
        store.dispatch('userData/setRealUser', {})
        store.dispatch('config/setAccountType', 'demo')
        this.close(this.connect())
      })
      .on('event_user_recharge', (data?: any) => {
        new event_user_recharge(data).handle()
      })
      .on('event_ping', (data?: any) => {
        store.dispatch('config/setDelay', data.delay)
        // console.log('ping')
      })
      .on('event_connect', (data?: any) => {
        console.log('Websocket connect success')
      })
      .on('event_debug', (data?: any) => {
        console.debug(data)
      })
      .on('event_notice', (data?: any) => {
        new event_notice(data).handle()
      })
      .on('event_forecast', (data?: any) => {
        new event_forecast(data).handle()
      })
  }

  /**
   * 更新 WebSocket 连接状态
   *
   * @param {Boolean} status 连接状态
   */
  updateSocketStatus(status: Boolean) {
    console.log()

    store.dispatch('socket/setSocketStatus', status)
  }

  close(e: any) {
    this.socket.close(e)
    this.socket.onClose(e)
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} message
   */
  send(message: any) {
    this.socket.send(message)
  }

  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }
}

export default new SocketInstance()
