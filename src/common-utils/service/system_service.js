/*
* 该文件使用时，只需要在需要用到的vue文件中单独导入就行了
* */
import url from '../request_api/system_api'
import Vue from 'vue'
const _MyHttp = Vue.prototype.$MyHttp;
const _MyHttp_header = Vue.prototype.$MyHttp_header;

export function getUserInfo(params) {
    return _MyHttp.get(url.GET_USER_INFO, {params:params}, _MyHttp_header);
}