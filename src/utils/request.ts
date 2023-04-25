import axios from 'axios'
import useStore from '@/stores/index'

// import { store } from '@/store/index';
// import Base64 from 'crypto-js/enc-base64';
import { Toast } from 'vant'
// import { getToken } from "@/uitls/jwt"
// import { signOut } from "@/uitls/auth"
// import { webDeviceId } from '@/uitls/common'
// 配置新建一个 axios 实例
const service = axios.create({
  // baseURL: 'https://admin.77fa.vip',
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// const base64UrlEncode = (str: any) => {
// 	var encodedSource = Base64.stringify(str);
// 	var reg = new RegExp('/', 'g');
// 	encodedSource = encodedSource.replace(/=+$/, '').replace(/\+/g, '-').replace(reg, '_');
// 	return encodedSource;
// }

// 添加请求拦截器
service.interceptors.request.use(
  (config: any) => {
    const apiList = ['/aiChat/customer/login', '/aiChat/role/list']
    console.log(config.url.indexOf(apiList) != -1)
    config.headers['Authorization'] = 'Bearer ' + useStore().user.token
    // 在发送请求之前做些什么 token
    for (let index = 0; index < apiList.length; index++) {
      const element = apiList[index]
      if (config.url.indexOf(element) != -1) {
        config.headers['Authorization'] = ''
      }
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export interface HttpResponse {
  status: number
  statusText: string
  code?: number
  data: {
    code: number
    count?: number
    data: any
    other?: any
    page_total?: number
    msg: string
  }
}

// 添加响应拦截器return new Promise<HttpResponse>
service.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error) => {
    // 对响应错误做点什么

    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service
