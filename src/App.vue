<template>
    <div id="app">
        <router-view class="mainrouter_view"/>
    </div>
</template>

<style lang="scss">
    @import "assets/css/reset.scss";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        font-size: 14px;
    }
    .mainrouter_view {
        height: 100%;
        /*background-color: #42b983;*/
    }
    #nprogress .bar {
        background: #F24B96 !important; //自定义颜色
    }
</style>
