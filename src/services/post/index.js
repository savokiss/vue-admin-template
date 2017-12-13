import Base from '../Base'
class Post extends Base {
  constructor () {
    super()
    this.queryUrl = '/posts'
  }

  query () {
    return this.sendGet(this.queryUrl).then(res => {
      return res
    })
  }
}

export default new Post()
