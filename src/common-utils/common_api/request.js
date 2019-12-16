import axios from 'axios/index'
import Vue from 'vue'
import qs from 'qs'
// import {Loading, Message} from "element-ui";

const AXIOS = axios.create({
   // baseURL: "http://10.121.69.94:9999/spidertool",
    timeout: 15000,
    responseType: 'json',
    withCredentials: true,
    mode: 'no-cors',
    credentials: 'same-origin',
    showModal: true,
    headers:{
       'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
    },
    transformRequest:[function (data, headers) {
        let res_data = data;
        if(headers['Content-Type']!==null){
            if(headers['Content-Type']!=="multipart/form-data"){
                res_data = qs.stringify(data, {indices: false});
            }
        }
        else{
            res_data = qs.string(data, {indices: false});
        }
    }]
});

AXIOS.interceptors.request.use((config)=>{
        return config
    },
    async (error)=>{
        return Promise.reject(error);
    }
);

const check_license = async (res)=>{
    if(res.headers && res.headers.hasOwnProperty('license_res')){
        let license_res = JSON.parse(res.headers['license_res']);
        if(license_res.result){
            let license_msg = license_res.msg;
            if(license_msg!==""){
                store.commit('set_license_msg',license_msg);
            }
        }
        else if(license_res.result===false){
            await Vue.prototype.$alert('系统license已失效，请重新申请license.'),{
                confirmButtonText: '确定',
                callback: action=>{
                    /*退出系统操作*/
                }
            }
        }
    }
};

AXIOS.interceptors.response.use(async (res)=>{
        /*收到response的第一步处理工作，起到总拦截作用*/
        return res;
    },
    (err)=>{
        console.error("error ------------------");
        if(err && err.response){
            console.log("rer.response =",err.response);
            switch(err.response.status){
                case 400: err.message = "请求错误（400）";break;
                case 401: err.message = "未授权，请重新登录（401）";break;
                case 403: err.message = "拒绝访问（403）";break;
                case 404: err.message = "请求出错（404）";break;
                case 408: err.message = "请求超时（408）";break;
                case 500: err.message = "服务器错误（500）";break;
                case 501: err.message = "服务器未实现（501）";break;
                case 502: err.message = "网络错误（400）";break;
                case 503: err.message = "服务不可用（400）";break;
                case 504: err.message = "网络超时（400）";break;
                case 505: err.message = "HTTP版本不受支持（400）";break;
                case 700: err.message = "文件导出失败";break;
                case 701: err.message = "文件导出失败（701）";break;
                default: err.message = `连接出错(${err.response.status})`;
            }
        }
        else{
            err.message = "连接服务器失败";
        }
        return Promise.reject(err);
    }
);

export const getUrl = ()=>{
  let currUrl = window.location.href;
  let menu_arr = currUrl.split('#');
  return menu_arr[menu_arr.length-1];
};

export default {
    install:function (Vue, options) {
        Object.defineProperty(Vue.prototype, '$MyHttp', {value: AXIOS});
        Object.defineProperty(Vue.prototype, '$getUrl', {value: getUrl});
    }
}
/*为了支持不依赖vue运行的应用使用，抛出此对象*/
export const MyHttp = AXIOS;

export const http_headers_creater = (tokens)=>{
    return{
        responseType: 'json',
        withCredentials: true,/*是否允许携带cookie信息*/
        mode: 'no-cors',/*headers不隐藏*/
        credentials: 'same-origin',
        emulateJSON: true,
        async: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': tokens,
        }
    }
};
export const http_headers_creater_formdata = (tokens)=>{
    return{
        responseType: 'json',
        withCredentials: true,/*是否允许携带cookie信息*/
        mode: 'no-cors',/*headers不隐藏*/
        credentials: 'same-origin',
        emulateJSON: true,
        async: false,
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': tokens,
        }
    }
};
export const http_headers_creater_filedata = (tokens)=>{
    return{
        responseType: 'blob',
        withCredentials: true,/*是否允许携带cookie信息*/
        mode: 'no-cors',/*headers不隐藏*/
        credentials: 'same-origin',
        emulateJSON: true,
        async: false,
        headers: {
            'Content-Type': 'application/octet-stream',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': tokens,
        }
    }
};
