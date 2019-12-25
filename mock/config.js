const api = require('./api.js');
const getUserInfo = require("./data/getUserInfo.js");
const getCompanyInfo = require("./data/getCompanyInfo");

const config = [
    {
        method: "get",
        url: api.getUserInfo,
        data: getUserInfo
    },
    {
        method: "get",
        url: api.getCompanyInfo,
        data: getCompanyInfo
    }
];
module.exports = config;