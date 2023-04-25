import fireBaseEvent from './fireBaseEvent'
import useStore from '@/stores/index'
const uuid = () => {
  const s: any = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}
export const webDeviceId = () => {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 16; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  const uuid = s.join('')
  return uuid
}
const getDeviceInfo = async () => {
  const os = /(Android)/i.test(navigator.userAgent)
    ? 'android'
    : /(ios)/i.test(navigator.userAgent)
    ? 'ios'
    : 'web'
  let client = {
    package_name: 'web',
    device_id: webDeviceId(),
    invite_code: '',
    aid: uuid(),
    os: os
  }
  if (
    useStore().config.client.aid == '' ||
    (os == 'android' && useStore().config.client.package_name == 'web')
  ) {
    fireBaseEvent.deviceInfo().then((data: any) => {
      if (data != undefined) {
        data = JSON.parse(data)
        const aid = data.googleAdId == '' ? data.androidId : uuid()
        client = {
          package_name: data.packageName,
          device_id: data.androidId,
          invite_code: data.channel,
          aid: aid,
          os: os
        }
      }
      useStore().config.client = client
      console.log('deviceInfo' + JSON.stringify(data))
    })
  }
}

export const getIosDeviceInfo = () => {
  if (navigator.userAgent.toLowerCase().indexOf('iphone') != -1) {
    const os = 'ios'

    let client = {
      package_name: 'web',
      device_id: webDeviceId(),
      invite_code: '',
      aid: uuid(),
      os: os
    }

    fireBaseEvent.deviceInfo().then((data: any) => {
      console.log('deviceInfo' + data)
      if (data) {
        data = JSON.parse(data)
        client = {
          package_name: data.packageName,
          device_id: data.deviceId,
          invite_code: '',
          aid: uuid(),
          os: os
        }
      }
      // store.dispatch('config/setClient', client)
      console.log('deviceInfo' + JSON.stringify(data))
    })
  }
}

/**
 * 初始化ios 获取设备信息事件
 */
// export const iosEventInit = async () => {
//   if (/(iPhone)/i.test(navigator.userAgent)) {
//     console.log('ios getDeviceInfo init')
//     window.addEventListener('flutterInAppWebViewPlatformReady', function (event) {
//       console.log('flutterInAppWebViewPlatformReady')
//       ;(window as any).AndroidEM = {}
//       ;(window as any).AndroidEM.firebaseEvent =
//         (function (value) {
//           ;(window as any).flutter_inappwebview.callHandler('AndroidEM', 'firebaseEvent', value)
//         })(window as any)['AndroidEM'].customEvent =
//         (function (value) {
//           ;(window as any).flutter_inappwebview.callHandler('AndroidEM', 'customEvent', value)
//         })(window as any)['AndroidEM'].getDeviceInfo =
//           function () {
//             return new Promise(function (resolve, reject) {
//               console.log('ios getDeviceInfo')
//               ;(window as any).flutter_inappwebview
//                 .callHandler('AndroidEM', 'getDeviceInfo')
//                 .then(function (data) {
//                   resolve(data)
//                 })
//             })
//           }
//     })
//   }
// }

export default { getDeviceInfo }
