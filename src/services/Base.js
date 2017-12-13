import api from './api'
import { Message } from 'element-ui'
// service 基础类，只用于继承
class Base {
  sendGet (url, params) {
    return api.get(url, { params }).then(response => {
      return response.data
    })
  }

  sendPost (url, data) {
    return api.post(url, data).then(response => {
      return response.data
    })
  }

  /**
   * service 中处理错误信息，一般在 新增，修改，删除等操作中调用
   * @param { res.data } data response 中的data
   * @param { success | error | errorOnly } options 成功或失败的 msg, errorOnly 只提示错误消息
   */
  handleError (data, options = {}) {
    if (data.rlt && data.rlt !== 'false') {
      !options.errorOnly && Message.success({
        message: options.success || '操作成功',
        showClose: true
      })
    } else {
      Message.error({
        message: options.error || data.message || '操作失败',
        showClose: true
      })
    }
  }

  // 处理成功的提示
  handleSuccess (msg) {
    Message.success(msg || '操作成功')
  }

  /**
   * url替换工具方法
   * /test/{name} => /test/savo
   * @param { String } url 传入的 url 地址
   * @param { Object } params 要替换的参数
   */
  parseUrl (url, params) {
    Object.keys(params).forEach(key => {
      var reg = new RegExp('\\{' + key + '\\}')
      url = url.replace(reg, params[key])
    })
    return url
  }
}

export default Base
