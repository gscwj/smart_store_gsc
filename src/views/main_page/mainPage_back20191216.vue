<template>
    <el-container>
        <el-main>
            <!--<div class="img_container">
                <span>vue组件走马灯</span>
                <el-carousel :interval="2000" arrow="always" indicator-position="none" height="200px">
                    <el-carousel-item v-for="img in images" :key="img.alt" fit="fill">
                        <el-image :src="img.url" :alt="img.alt"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>-->
            <div class="img_container2">
                <span>swiper轮播图</span>
                <swiper class="swiper_div" :options="swiperOption2" ref="mySwiper" @someSwiperEvent="callback">
                    <!-- slides -->
                    <swiper-slide class="slide_item" v-for="img in images" :key="img.alt">
                        <el-image :src="img.url" :alt="img.alt" fit="cover"></el-image>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
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
                swiperOption: {
                    autoplay: true,
                    delay: 1000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                swiperOption2: {
                    direction: 'vertical',
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
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            this.main_flow();
            this.swiper.slideToLoop(3, 1000, false);
            this.swiper.autoplay.start();
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
        background-color: rgba(209, 90, 57, .3);

        .el-main {
            height: 2000px;
            /*background-color: red;*/
            font-size: 14px;
            padding: 3px 10px 0 10px;

            .img_container {
                min-height: 5rem;
                background-color: rgba(73, 218, 174, .3);
                padding: 0;
                margin: 0;

                .el-image {
                    height: 100%;
                    width: 100%;
                }

                .el-carousel__item {
                    background-color: greenyellow;
                }

                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }

                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }
            }

            .img_container2 {
                height: 12rem;
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
                        padding: 0 20px 0 0;
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
        }
    }
</style>