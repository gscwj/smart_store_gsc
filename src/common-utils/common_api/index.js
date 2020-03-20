import MyAxios, {http_headers_creater,http_headers_creater_filedata,http_headers_creater_formdata} from "./request";

import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'

/*引入swiper组件的css样式文件*/
import 'swiper/dist/css/swiper.min.css'
import VueAwesome from 'vue-awesome-swiper'
import G6 from '@antv/g6'
/*import {
    Container, Main, Header, Footer, Menu, MenuItem, Submenu, Backtop
} from 'element-ui'*/
/*import 'vant/lib/index.css';
import {
    Icon,Button,Image,Lazyload,
} from 'vant';
import Vant from 'vant';*/

import clonedeep from 'lodash.clonedeep'

export default {
    name: 'common_api',
    install:function(Vue, options){
        console.log("--- common_api - index.js已经加载成功 - axios相关配置已完成");
        /*let element_ui_components = [Container,Main,Header,Footer,Menu,MenuItem,Submenu,Image,Backtop];
        element_ui_components.forEach((item, index)=>{
            Vue.use(item);
        });*/
        Vue.use(Element);

        /*let vant_ui_components = [Icon,Button,Image,Lazyload];
        vant_ui_components.forEach((item, index)=>{
            Vue.use(item);
        });*/
        // Vue.use(Vant);

        Vue.use(VueAwesome);

        Vue.use(MyAxios);

        Vue.prototype.$MyHttp_header = http_headers_creater(null);
        Vue.prototype.$MyHttp_header_formdata = http_headers_creater_formdata(null);
        Vue.prototype.$MyHttp_header_filedata = http_headers_creater_filedata(null);
        Vue.prototype.$clonedeep = clonedeep;
        Vue.prototype.$G6 = G6;
    }
}
