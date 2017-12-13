import Base from '../Base'
/**
 * 基础数据类
 * 方法名如果是复数，一般都会在vuex中缓存
 */
class Dict extends Base {
  constructor () {
    super()
    this.areaUrl = '/base/acquireBaseData/area'
    this.departmentUrl = '/base/acquireDepartment/{deptId}'
    this.dingUserUrl = '/base/acquireDDUser/{deptId}'
    this.courseTypeUrl = '/course/getCourseTypes'
    this.courseTagUrl = '/admin/getCourseTagList'
  }

  // 查询所有地区
  queryArea () {
    return this.sendGet(this.areaUrl).then(res => {
      return res
    })
  }

  /**
   * 根据ID获取事业部
   * @param { String } deptId
   */
  queryDepartment (deptId = 1) {
    let url = this.parseUrl(this.departmentUrl, {
      deptId
    })
    return this.sendGet(url).then(res => {
      return res
    })
  }

  /**
   * 根据部门查询钉钉用户
   * @param { String } deptId
   */
  queryDingUser (deptId) {
    let url = this.parseUrl(this.dingUserUrl, {
      deptId
    })
    return this.sendGet(url).then(res => {
      return res
    })
  }

  /**
   * 查询后台的课程类别
   * @type cached
   */
  queryCourseTypes () {
    return this.sendGet(this.courseTypeUrl)
  }

  /**
   * 查询标签列表
   * @type cached
   */
  queryCourseTags () {
    return this.sendGet(this.courseTagUrl)
  }
}

export default new Dict()
