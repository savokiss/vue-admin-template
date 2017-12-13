import store from '@/store'
// cache 工具方法，在 main.js 中挂在vue实例上
export function load (name) {
  store.dispatch('loadCache', name)
}

export default {
  load
}
