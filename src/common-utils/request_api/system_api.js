/*
* 集中配置本系统主体的接口
* */
const API_PREFIX = '';

let API_HANDLER = {
    GET_USER_INFO: '/API/userList',/*获取用户信息列表*/
    GET_USER_INFO2: '/API/userList2',/*获取用户信息列表*/
};
for (let apihandlerKey in API_HANDLER) {
    API_HANDLER[apihandlerKey] = API_PREFIX+API_HANDLER[apihandlerKey];
}

export default API_HANDLER;