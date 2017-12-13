import * as types from '../mutation-types'
import dictApi from '@/services/dict'
import _ from 'lodash'
// 需要缓存的数据，services中方法需要定义成复数形式

const state = {
  // 课程类别
  courseTypes: [
    { label: '直播', value: 1 },
    { label: '录播', value: 2 }
  ],
  // 必修类别
  requireTypes: [
    { label: '必修', value: 1 },
    { label: '选修', value: 2 },
    { label: '其他', value: 3 }
  ],
  // 课程模式
  courseModes: [
    { label: '线上线下均可', value: 1 },
    { label: '仅线上', value: 2 },
    { label: '仅现场', value: 3 }
  ],
  // 课程标签
  courseTags: []
}

const getters = {
  courseTypes: state => state.courseTypes,
  requireTypes: state => state.requireTypes,
  courseModes: state => state.courseModes,
  courseTags: state => state.courseTags
}

const actions = {
  loadCache ({ commit }, name) {
    dictApi[`query${_.upperFirst(name)}`]().then(res => {
      if (res.rlt) {
        commit(types.LOAD_CACHE, {
          name,
          data: res.data
        })
      }
    })
  }
}

const mutations = {
  [types.LOAD_CACHE] (state, payload) {
    state[payload.name] = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
