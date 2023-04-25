// import { HomeService } from "@/api/home";
export default class fireBaseEvent {
  static eventList = {}
  static onPurchase = async (amount: number, country: string) => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.onPurchase) {
      ;(window as any).AndroidEM.onPurchase(amount, country)
    } else {
      console.error('AndroidEM.onPurchase undefind')
    }
  }

  static deviceInfo = async () => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.getDeviceInfo) {
      return new Promise(function (resolve, reject) {
        const pro = (window as any).AndroidEM.getDeviceInfo()
        if (pro instanceof Promise) {
          pro.then(function (data) {
            resolve(data)
          })
        } else {
          resolve(pro)
        }
      })
    } else {
      console.warn('AndroidEM.getDeviceInfo undefind')
    }
  }

  static fastDeviceInfo = async () => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.getDeviceInfo) {
      return new Promise(function (resolve, reject) {
        const pro = (window as any).AndroidEM.getDeviceInfo()
        if (pro instanceof Promise) {
          pro.then(function (data) {
            resolve(data)
          })
        } else {
          resolve(pro)
        }
      })
    } else {
      console.warn('AndroidEM.getDeviceInfo undefind')
    }
  }

  static onEvent = async (name: string, key?: any, value?: any) => {
    // if ((window as any).AndroidEM && (window as any).AndroidEM.onPurchase) {
    if ((window as any).AndroidEM) {
      if (name && key && value) {
        ;(window as any).AndroidEM.firebaseEvent(name, key, value)
      } else {
        ;(window as any).AndroidEM.firebaseEvent(name, 'key', key)
      }
    } else {
      console.warn('AndroidEM.firebaseEvent undefind')
    }
    let evt = ''
    if (name && key && value) {
      evt = name + '___' + key + '___' + import.meta.env.VITE_APP_VERSION + '___' + value
    } else {
      evt = name + '___' + key + '___' + import.meta.env.VITE_APP_VERSION + '___' + key
    }
    // HomeService.event({ event: evt })
  }

  static googleLogin = async () => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.googleLogin) {
      return new Promise(function (resolve, reject) {
        const pro = (window as any).AndroidEM.googleLogin()
        if (pro instanceof Promise) {
          pro.then(function (data) {
            resolve(data)
          })
        } else {
          resolve(pro)
        }
      })
    }
  }

  static facebookLogin = async () => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.facebookLogin) {
      return new Promise(function (resolve, reject) {
        const pro = (window as any).AndroidEM.facebookLogin()
        if (pro instanceof Promise) {
          pro.then(function (data) {
            resolve(data)
          })
        } else {
          resolve(pro)
        }
      })
    }
  }

  /**
   *
   * @param type 0 defautl 1 Horizontal 2 vertical
   * @returns
   */
  static webViewScreenSwitch = (type: 0 | 1 | 2) => {
    if ((window as any).AndroidEM && (window as any).AndroidEM.setScreenType) {
      return new Promise(function (resolve, reject) {
        const pro = (window as any).AndroidEM.setScreenType(type)
        if (pro instanceof Promise) {
          pro.then(function (data) {
            alert(data)
            resolve(data)
          })
        } else {
          alert(pro)
          resolve(pro)
        }
      })
    } else {
      alert('dont have AndroidEM setScreenType')
    }
  }
}
