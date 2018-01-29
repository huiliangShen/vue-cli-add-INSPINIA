<template>
  <div class="login-wrapper">
    <div class="loginColumns animated fadeInDown">
      <div class="row">
        <div class="col-md-6">
          <h2 class="font-bold" style="color: #fff; text-shadow: 5px 2px 6px #000; ">嘉兴市长期护理保险失能评定系统</h2>
        </div>
        <div class="col-md-6">
          <div class="ibox-content" v-loading="loading">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" v-model="userName"/>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="密码" v-model="password" minlength="6"/>
            </div>
            <button type="button" @click="goTo()" class="btn btn-primary block full-width m-b" style="font-size:18px;">
              登录
            </button>
            <a href="#" class="center">
              <small style="font-size:12px;">忘记密码？</small>
            </a>
            <p class="text-muted text-center">
              <small style="font-size:12px;">没有账号？</small>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="space-15"></div>
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <button class="btn btn-google pull-right hide">查看公示</button>
        </div>
      </div>

    </div>
    <div style="max-width: 800px; margin: 0 auto; bottom: 0; color: #fff;font-size:12px;">
      <hr/>
      <div class="row">
        <div class="col-md-6">
          浙江嘉科智慧养老服务有限公司
        </div>
        <div class="col-md-6 text-right">
          ©  Cetccare
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // let md5 = require('md5');
  import $ from 'jquery';
  import '../../assets/js/jQuery-MD5';
  import {setCache} from '../../libs/tool';
  export default {
    data () {
      return {
        userName: '',
        password: '',
        loading: false
      };
    },
    methods: {
      goTo () {
        this.loading = true;
        let obj = {
          account: this.userName,
          psw: $.md5(this.password)
        };
        this.$http('/NewPC/Login', obj).then(res => {
          this.loading = false;
          if (res.result) {
            /* localStorage */
            setCache('user', res.data.userInfo);
            this.$store.commit('setToken', '123456');
            this.$store.commit('setUser');
            this.$router.push({path: '/index/user-center'});
          } else {
            window.alert(res.message);
          }
        }).catch(error => {
          this.loading = false;
          window.alert(error);
        });
      }
    }
  };
</script>

<style>
  .login-wrapper {
    opacity: 1;
    background: url('../../assets/img/login_bg.jpg') no-repeat scroll 0 0 / cover;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: opacity .8s ease;
    left: 0;
  }
</style>
