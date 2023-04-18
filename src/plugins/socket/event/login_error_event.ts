import { store } from '@/store/index'
import router from "@/router"
import { Dialog } from "vant";

/**
 * @description: 异常
 * @param {*}
 * @return {*}
 */
class loginErrorEvent {
  data: any
  constructor(data: any) {
    this.data = data
  }
  handle() {
    Dialog.confirm({
      title: "Tips",
      message: this.data.msg,
      confirmButtonText: "Login",
      cancelButtonText: "Cancel",
    })
      .then(() => {
        // on confirm
        router.push({
          path: "/login",
        });
      })
      .catch(() => {
        // on cancel
      });
  }
}

export default loginErrorEvent
