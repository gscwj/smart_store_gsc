/*
* 集中配置本系统主体的接口
* */
/*插入mock服务器模拟接口
* 当真实后台接入时，将后台接口替换对应mock接口就行了
* */
import mock_api from '../../../mock/api'
let API_PREFIX = '/api';
if(process.env.NODE_ENV==='production'){
    API_PREFIX = 'http://localhost:8088';
}
let API_HANDLER = {
    GET_USER_INFO: mock_api.getUserInfo,/*获取用户信息列表*/
    GET_COMPANY_INFO: mock_api.getCompanyInfo,/*获取用户信息列表*/
};
for (let apihandlerKey in API_HANDLER) {
    API_HANDLER[apihandlerKey] = API_PREFIX+API_HANDLER[apihandlerKey];
}

export default API_HANDLER;