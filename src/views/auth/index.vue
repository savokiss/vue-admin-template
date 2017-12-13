<template>
  <div class="authView">
    <img src="../../assets/logo.svg" alt="logo" class="loginLogo">

    <el-form class="loginForm" autoComplete="on" :model="form" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">后台管理系统</h3>

      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="form.username" autoComplete="on" placeholder="邮箱" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="form.password" autoComplete="on" placeholder="密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="loginBtn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import authApi from '@/services/auth'
import { validUsername } from '@/utils/validators'
export default {
  name: 'auth',
  data () {
    const usernameValidator = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const passwordValidator = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: usernameValidator }],
        password: [{ required: true, trigger: 'blur', validator: passwordValidator }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        authApi.login(this.form).then(res => {
          if (res.rlt) {
            this.$router.push({ path: '/' })
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.authView {
  position: relative;
  height: 100vh;
  background-color: #2d3a4b;
  background: url(../../assets/login_bg.jpg) no-repeat center;
  background-size: 100% 100%;
}

.loginLogo {
  width: 180px;
  position: absolute;
  top: 40px;
  left: 80px;
}

.el-input {
  display: inline-block;
  height: 47px;
  width: 100%;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}

.title {
  font-size: 26px;
  font-weight: 400;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.loginForm {
  width: 360px;
  position: absolute;
  left: 50%;
  top: 20%;
  margin-left: -200px;
}

.loginBtn {
  width: 100%;
}
</style>
