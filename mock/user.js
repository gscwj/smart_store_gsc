/*
* 使用mock框架模拟后端接口返回moni 数据
* */
import Mock from 'mockjs'
console.log("/API/userList 模拟接口已生成");
Mock.mock('/API/userList','post',function (option) {
    return {
        'code': '0',
        message: 'success',
        data:{
            userId: 1,
            userName: 'admin',
            deptName: '研发部门',
            postNames: [
                '董事长','总经理'
            ],
            roleNames: [
                '管理员'
            ],
            email: 'ry@163.com',
            phone: '13523455534',
            avatar: '',
            sex: '0'
        }

    }
});