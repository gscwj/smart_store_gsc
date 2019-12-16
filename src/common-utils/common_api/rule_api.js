export const validate_login_name = (rule, value, callback) => {
    let value_tmp = value.trim();
    let len_value = value_tmp.length;
    if (value_tmp === '') {
        callback(new Error('请输入用户名'));
    }
    else if(len_value>40){
        callback(new Error('长度限制: 1-40个字符'));
    }
    else {
        callback();
    }
};
export const validate_login_passwd = (rule, value, callback) => {
    let value_tmp = value;
    let len_value = value_tmp.length;
    if (value_tmp === '') {
        callback(new Error('请输入密码'));
    }
    else if(len_value>18){
        callback(new Error('长度限制: 最大18个字符'));
    }
    else {
        callback();
    }
};
export const validate_login_vertify = (rule, value, callback) => {
    let value_tmp = value;
    let len_value = value_tmp.length;
    if (value_tmp === '') {
        callback(new Error('请输入验证码'));
    }
    else if(len_value!==4){
        callback(new Error('长度限制: 仅能4个字符'));
    }
    else {
        callback();
    }
};