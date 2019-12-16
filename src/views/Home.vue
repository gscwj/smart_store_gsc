<template>
    <div class="home">
        <!--    <div class="home_title">vue前端搭建模板</div>-->
        <div class="home_content">
            <router-view class="home_content_view"></router-view>
        </div>
        <div class="home_footer">
            <el-menu mode="horizontal" class="home_footer_menu" :default-active="active_page" :router="true"
                     @select="menu_handler">
                <el-menu-item index="/main_page">
                    <div class="icon_btn">
                        <!--            <i class="el-icon-s-home"></i>-->
                        <van-icon name="wap-home-o"></van-icon>
                        <span>Home</span>
                    </div>
                </el-menu-item>
                <el-menu-item index="/store">
                    <div class="icon_btn">
                        <i class="el-icon-shopping-cart-2"></i>
                        <span>Store</span>
                    </div>
                </el-menu-item>
                <el-menu-item index="/forum">
                    <div class="icon_btn">
                        <i class="el-icon-chat-dot-round"></i>
                        <span>Forum</span>
                    </div>
                </el-menu-item>
                <el-menu-item index="/corner">
                    <div class="icon_btn">
                        <i class="el-icon-user"></i>
                        <span>Corner</span>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        data() {
            return {
                active_page: '/main_page',
            }
        },
        created() {
            let curr_url = window.location.href;
            this.active_page = curr_url.split('#')[1];
        },
        mounted() {

        },
        methods: {
            menu_handler: function (key, key_path) {
                console.log(key, " - ", key_path);
            }
        },
    }
</script>
<style scoped lang="scss">
    @import "../assets/css/home.scss";
</style>
