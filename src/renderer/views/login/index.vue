/*
 * @Author: liuxia
 * @Date: 2019-03-09 20:35:59
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-09 22:25:24
 */

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="card-box login-form">
      <h3 class="title">login</h3>
      <el-form-item
        class="login_item"
        prop="mobile">
        <el-input
          v-model="loginForm.mobile"
          name="mobile"
          type="text"
          autocomplete="off"
          clearable
          placeholder="请输入账号">
          <i
            slot="prefix"
            class="iconfont icon-user-fill" />
        </el-input>
      </el-form-item>
      <el-form-item
        class="login_item"
        prop="password">
        <el-input
          v-model="loginForm.password"
          name="password"
          type="password"
          clearable
          autocomplete="off"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin">
          <i
            slot="prefix"
            class="iconfont icon-lock-fill-open" />
        </el-input>
      </el-form-item>
      <el-form-item class="login_handle">
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          class="btn_login"
          @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { validateMobile } from '@/utils/validate'

export default {
  name: 'Login',
  data () {
    const validateAccount = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '15958106364',
        password: '123456'
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validateAccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(res => {
            console.log(document.cookie)
            // this.loading = false
            console.log(res)
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
// @import "src/styles/mixin.scss";
.login-container {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color:rgba(14, 14, 14, 1);
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547111954218&di=b3fbd00e05db66171fa842dc8342aca4&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw1777h1000%2F20171203%2Fac8f-fypikwt4241401.jpg');
  background-size: cover;
  background-position: center center;
  // input:-webkit-autofill {
  //   box-shadow: 0 0 0px 1000px rgb(255, 255, 255) inset !important;
  //   -webkit-box-shadow: 0 0 0px 1000px rgb(255, 255, 255) inset !important;
  //   -webkit-text-fill-color: #fff !important;
  // }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 8px 40px;
    &.el-input__inner {
      padding-left: 40px;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition-delay: 999999s;
      transition: color 999999s ease-out, background-color 999999s ease-out;
      -webkit-transition-delay: 999999s;
      -webkit-transition: color 999999s ease-out, background-color 999999s ease-out;
    }
  }
  .login-form {
    width: 450px;
    padding: 50px;
    background: rgba(255, 255, 255, 0.83);
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    .login_item {
      border-bottom: 1px solid #CFCFCF;
      margin-bottom: 30px;
      .el-input {
        display: inline-block;
        height: 100%;
        width: 100%;
        font-size: 16px;
      }
      .el-form-item__error {
        padding-top: 10px;
      }
    }
    .login_handle {
      margin-bottom: 0;
      padding-top: 20px;
      .btn_login {
        height: 50px;
        font-size: 18px;
        background: #4680FF;
        border-radius: 8px;
        border-color: #4680ff;
      }
    }
    .title {
      margin-bottom: 20px;
      font-size: 28px;
      color: #333;
      text-align: center;
      font-weight: normal;
    }
    .iconfont {
      width: 25px;
      font-size: 22px;
      color: #999;
    }
  }
}

</style>
