/**
 * Created by admin on 2018/1/24.
 */
import http from './http';

export default {
  install (Vue) {
    Vue.prototype.$http = http;
    Vue.http = http;
  },
  $http: http
};

export const $http = http;
