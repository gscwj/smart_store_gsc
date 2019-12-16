<template>
    <el-container>
        <el-main>
            Corner
        </el-main>
    </el-container>
</template>
<script>
    import {getUserInfo} from '../../common-utils/service/system_service'
    export default {
        name: "corner",
        data(){
            return {

            }
        },
        mounted() {
            this.main_flow();
        },
        methods:{
            main_flow:function () {
                getUserInfo({}).then((res)=>{
                    console.log("corner_page :res =",res);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-container{
        /*height: 100%;*/
        background-color: #42b983;
        .el-main{
            /*height: 100%;*/
        }
    }
</style>