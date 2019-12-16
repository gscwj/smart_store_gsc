import MyAxios, {http_headers_creater,http_headers_creater_filedata,http_headers_creater_formdata} from "./request";
import '../../../mock/index'

import 'element-ui/lib/theme-chalk/index.css'
import {
    Container,Main,Header,Footer,Menu,MenuItem,Submenu
} from 'element-ui'

import 'vant/lib/index.css';
import {
    Icon,Button,
} from 'vant';

export default {
    name: 'common_api',
    install:function(Vue, options){
        console.log("--- common_api - index.js已经加载成功 - axios相关配置已完成");
        Vue.use(Container);
        Vue.use(Main);
        Vue.use(Header);
        Vue.use(Footer);
        Vue.use(Menu);
        Vue.use(MenuItem);
        Vue.use(Submenu);

        Vue.component(Icon.name, Icon);
        Vue.component(Button.name, Button);

        Vue.use(MyAxios);

        Vue.prototype.$MyHttp_header = http_headers_creater(null);
        Vue.prototype.$MyHttp_header_formdata = http_headers_creater_formdata(null);
        Vue.prototype.$MyHttp_header_filedata = http_headers_creater_filedata(null);
    }
}
