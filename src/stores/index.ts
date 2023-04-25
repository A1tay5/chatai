import useUserStore from './user'
import useCounterStore from './counter'
import useconfigStore from './config'
import useChatStore from './chat'

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
    chat: useChatStore(),
    config: useconfigStore()
  }
}
