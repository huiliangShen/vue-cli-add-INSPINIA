// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {routers, otherRouter, appRouter} from './router';
/* eslint-disable */
import './common/commonCss.js'
import './common/commonJs'
import { Loading } from 'element-ui';
import AjaxPlugin from './libs/ajax';
import {title, getCache, clearCache} from './libs/tool';
import { getToken, setToken, removeToken } from './libs/auth'

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(AjaxPlugin);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
  //mode: 'history',
  routes: routers,
  linkActiveClass: 'active'
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start();
  title(to.title);
  if (to.name === 'register') {
    next();
  } else if (to.name === 'forget-password') {
    next();
  } else {
    if (!getToken('JETC') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
      next({
        name: 'login'
      });
    } else if (getToken('JETC') && to.name === 'login')  {
      next({
        path: '/index/user-center'
      });
    }
    else {
      /* if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access !== undefined) {  // 判断用户是否有权限访问当前页
        if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access === parseInt(localStorage.getItem("access"))) {
          Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);  // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
        } else {
          router.replace({
            name: 'error_401'
          });
          next();
        }
      } else {
        Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
      } */
      next();
    }
  }
  // iView.LoadingBar.finish();
});

// 状态管理
const store = new Vuex.Store({
  state: {
    routers: [
      otherRouter,
      ...appRouter
    ],
    userInfo: null,
    token: getToken(),
    userModule: [],
    menuList: [],
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    currentPageName: '/system/role-manage',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ]
  },
  getters: {

  },
  mutations: {
    setUser (state) {
      let userInfo = getCache('user');
      state.userInfo = userInfo ? userInfo : null;
      state.userModule = userInfo && userInfo.UserModule ? userInfo.UserModule : null;
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name;
    },
    setMenuList (state, menulist) {
      state.menuList = menulist;
    },
    setAvator (path) {
      localStorage.avatorImgPath = path;
    },
    setToken: (state, token) => {
      setToken(token);
      state.token = token;
    }
  },
  actions: {
    loginOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('setToken', '');
        clearCache('user', 'l');
        removeToken();
        resolve();
      }).catch(error => {
        reject(error);
      });
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    this.$store.commit('setUser');
  }
});
