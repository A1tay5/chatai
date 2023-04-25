// import { store } from '@/store/index'
// import config from '@/config/config'
import WsSocket from '@/plugins/socket/ws-socket'
// import { getToken } from '@/utils/auth'
// 引入消息处理类
// /**
//  * SocketInstance 连接实例
//  *
//  * 注释: 所有 WebSocket 消息接收处理在此实例中处理
//  */
import useStore from '@/stores'

class SocketInstance {
  /**
   * WsSocket 实例
   */
  socket?: any
  path?: string
  customerId?: any = 1
  // url: any = 'ws://admin.77fa.vip/aiChat/websocket/'
  url: any = 'ws://mymistic.natapp1.cc/aiChat/websocket/'
  /**
   * SocketInstance 初始化实例
   */
  constructor() {
    setTimeout(() => {
      this.customerId = useStore().user.userInfo.customerId
    })
    this.path = `${import.meta.env.VITE_WS_URL}${this.customerId}`
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
        }
      }
    )
    console.log(this.socket, this.path)

    this.registerEvents()
  }

  // 连接 WebSocket 服务
  connect(val: any) {
    console.log(this.socket)
    console.log(val)
    this.customerId = val
    // const token =
    //   store.state.config.account_type == 'demo'
    //     ? store.state.config.demo_token
    //     : store.state.config.real_token
    // if (token == '') {
    //   setTimeout(() => {
    //     this.connect()
    //   }, 1000)
    //   return
    // }
    this.path = `${import.meta.env.VITE_WS_URL}${this.customerId}`
    this.socket.connection()
  }

  /**
   * 注册回调消息处理事件
   */
  registerEvents() {}

  /**
   * 更新 WebSocket 连接状态
   *
   * @param {Boolean} status 连接状态
   */
  updateSocketStatus(status: Boolean) {
    console.log()

    // store.dispatch('socket/setSocketStatus', status)
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
