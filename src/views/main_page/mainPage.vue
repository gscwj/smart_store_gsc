<template>
    <el-container>
        <el-backtop target=".el-main" :visibility-height="100" :bottom="50" :right="5"></el-backtop>
        <el-main>
            <div class="search">
                <el-input
                        placeholder="清明上河图"
                        v-model="serach_keyword"
                        clearable>
                    <i slot="prefix" class="el-input__icon iconfont iconsousuo iconfont_size"></i>
                    <i slot="suffix" class="el-input__icon iconfont iconyduierweimasaomiao iconfont_size"></i>
                </el-input>
            </div>
            <div class="img_container2">
                <swiper class="swiper_div" :options="swiperOption2" ref="mySwiper" @someSwiperEvent="callback">
                    <!-- slides -->
                    <swiper-slide class="slide_item" v-for="img in images" :key="img.alt">
                        <el-image :src="img.url" :alt="img.alt" fit="cover"></el-image>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="classify_div">
                <swiper class="swiper_div" :options="swiperOption3" ref="mySwiper3" @someSwiperEvent="callback">
                    <!-- slides -->
                    <swiper-slide class="slide_item" v-for="(page,index) in classify_page_objs" :key="index">
                        <div class="classify_div_page">
                            <div class="page_classfiy_obj" v-for="obj in page" :key="obj.name">
                                <svg class="obj_icon" aria-hidden="true">
                                    <use :xlink:href="'#'+obj.icon_class"></use>
                                </svg>
                                <span class="obj_text">{{obj.name}}</span>
                            </div>
                        </div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="book_list">
                <div class="book_kuang">
                    <div class="title">
                        <span>图书畅销榜<i class="iconfont iconforword"></i></span><br/>
                    </div>
                    <div class="book_content">
                        <span>jlskdjlfksjd</span>
                        <div style="height: 20px;background-color: #4cbcfb">
                            聚少离多开发交流撒解放路卡萨丁
                            <el-button>劳动法律萨科技的</el-button>
                        </div>
                        <p>图书册数</p>
                    </div>
                </div>
                <div class="book_kuang">
                    <div class="title">
                        <span>新书上架<i class="iconfont iconforword"></i></span><br/>
                    </div>
                    <div class="book_content">

                    </div>
                </div>
                <div class="book_kuang">
                    <div class="title">
                        <span>今日秒杀{{curr_time.getHours()}}:{{curr_time.getMinutes()}}:{{curr_time.getSeconds()}}<i class="iconfont iconforword"></i></span><br/>
                    </div>
                    <div class="book_content">

                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {getUserInfo} from '../../common-utils/service/system_service'

    export default {
        name: "main-page",
        data() {
            return {
                serach_keyword: '',/*搜索关键词*/
                swiperOption2: {
                    direction: 'horizontal',
                    slidesPerView: 1,
                    spaceBetween: 30,
                    mousewheel: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                swiperOption3: {
                    direction: 'horizontal',
                    slidesPerView: 1,
                    spaceBetween: 30,
                    mousewheel: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                images: [
                    {
                        url: require('../../assets/images/home_imgs/home_img1.jpg'),
                        alt: 'home_img1'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img2.jpg'),
                        alt: 'home_img2'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img3.jpg'),
                        alt: 'home_img3'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img4.jpg'),
                        alt: 'home_img4'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img5.jpg'),
                        alt: 'home_img5'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img6.jpeg'),
                        alt: 'home_img6'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img7.jpg'),
                        alt: 'home_img7'
                    },
                    {
                        url: require('../../assets/images/home_imgs/home_img8.jpg'),
                        alt: 'home_img8'
                    },
                ],
                classify_page_objs: [
                    {
                        name: '图书',
                        info: '',
                        icon_class: 'iconbook'
                    },
                    {
                        name: '童书',
                        info: '',
                        icon_class: 'iconbooks'
                    },
                    {
                        name: '新书榜',
                        info: '',
                        icon_class: 'iconnecromancybook'
                    },
                    {
                        name: '电子书',
                        info: '',
                        icon_class: 'iconairplanetickets'
                    },
                    {
                        name: '学生文具',
                        info: '',
                        icon_class: 'iconsaddle'
                    },
                    {
                        name: '服装',
                        info: '',
                        icon_class: 'iconbottle'
                    },
                    {
                        name: '超市',
                        info: '',
                        icon_class: 'iconsextant'
                    },
                    {
                        name: '食品',
                        info: '',
                        icon_class: 'iconwheel'
                    },
                    {
                        name: '领劵中心',
                        info: '',
                        icon_class: 'iconsword'
                    },
                    {
                        name: '签到',
                        info: '',
                        icon_class: 'iconwanted'
                    },
                    {
                        name: '小说',
                        info: '',
                        icon_class: 'iconbarrel'
                    },
                    {
                        name: '计算机',
                        info: '',
                        icon_class: 'iconjisuanji1'
                    },
                    {
                        name: '美食',
                        info: '',
                        icon_class: 'iconmeishi1'
                    },
                    {
                        name: '启蒙',
                        info: '',
                        icon_class: 'iconqimeng1'
                    },
                    {
                        name: '启蒙1',
                        info: '',
                        icon_class: 'iconqimeng1'
                    },
                ],
                curr_time: new Date(),
                timer: null
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            console.log("刚刚加载");
            this.main_flow();
            this.swiper.slideToLoop(3, 1000, false);
            this.swiper.autoplay.start();
            console.log("this.timer =",this.timer);
            this.timer = setInterval(()=>{
                this.curr_time = new Date();
            },1000);
            let tmp_classigy_page_objs = this.$clonedeep(this.classify_page_objs);
            let array = [];
            this.classify_page_objs = [];
            tmp_classigy_page_objs.forEach((item,index)=>{
                if(index!==0&&index%10===0){
                    this.classify_page_objs.push(array);
                    array = [];
                }
                array.push(item);
                if(index+1===tmp_classigy_page_objs.length){
                    this.classify_page_objs.push(array);
                }
            });
            console.log("this.classify_page_objs =",this.classify_page_objs);
        },
        beforeDestroy(){
            clearInterval(this.timer);
            console.log("beforeDestroy timer去除");
        },
        destroyed(){
            clearInterval(this.timer);
            console.log("destroyed timer去除");
        },
        methods: {
            main_flow: function () {
                getUserInfo({}).then((res) => {
                    console.log("main_page :res =", res);
                })
            },
            callback: function (evt) {
                console.log("swiper: evt =", evt);
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-container, .el-main {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .el-container {
        overflow-y: auto;
        /*background-color: rgba(209, 90, 57, .3);*/
        background-color: rgba(245,245,245,.6);

        .el-main {
            /*height: 2000px;*/
            /*background-color: red;*/
            font-size: 14px;
            padding: 3px 10px 0 10px;

            .search {
                font-size: 18px;

                i.iconfont_size {
                    font-size: 20px;
                    color: #2c3e50;
                }
            }

            .img_container2 {
                height: 9rem;
                /*background-color: rgba(73, 218, 174, .3);*/
                padding: 0;
                margin: 10px 0 0 0;

                .swiper_div {
                    height: 100%;
                    //background-color: yellow;
                    .el-image {
                        height: 100%;
                        width: 100%;
                        /*background-color: #4cbcfb;*/
                    }

                    .slide_item {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-size: 16px;
                    }

                }
            }

            .classify_div {
                margin: 10px 0 0 0;
                height: 10rem;
                /*background-color: rgba(76,188,251,.4);*/
                background-color: rgba(255,255,255,.8);

                .swiper_div {
                    box-sizing: border-box;
                    height: 100%;
                    padding: 5px;
                    .classify_div_page {
                        box-sizing: border-box;
                        height: 100%;
                        /*background-color: #4cbcfb;*/
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        padding: 5px 15px 5px 15px;
                        .page_classfiy_obj {
                            height: 4rem;
                            width: 3.5rem;
                            margin: 3px;
                            /*background-color: #99a9bf;*/
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: center;

                            .obj_icon {
                                margin: 0.2rem;
                                width: 2.3rem;
                                height: 2.3rem;
                                fill: currentColor;
                                overflow: hidden;
                            }
                            .obj_text {
                                line-height: 1.6rem;
                                color: black;
                                font-size:12px;
                                font-weight: lighter;
                            }
                        }
                    }
                }
            }
            .book_list{
                margin: 1.2rem 0 0 0;
                height: 40rem;
                background-color: white;
                border-radius: .4rem;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
                .book_kuang{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    .title{
                        padding: 0 0 0 1rem;
                        text-align: left;
                        font-size: 14px;
                        font-weight: normal;
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        /*background-color: red;*/
                    }
                    .book_content{
                        height: 10rem;
                        border: #4cbcfb double 1px;
                    }
                }
            }
        }
    }
</style>
<style>
    .search {
        margin: 0 0 10px 0;

        /deep/
        input {
            border: 0;
        }
    }
</style>