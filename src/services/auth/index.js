import Base from '../Base'

class Auth extends Base {
  constructor () {
    super()
    this.loginUrl = '/user/login'
  }

  login (data) {
    return new Promise((resolve, reject) => {
      resolve({
        rlt: true
      })
    })
  }
}

export default new Auth()
