// 导入模块
const mongoose = require('mongoose');
// 导入配置文件
const configObj = require(process.cwd() + "/common/config.json").db_config

// 连接数据库
const db = mongoose.createConnection(`mongodb://${configObj.host}:${configObj.port}/${configObj.dbname}`, {useNewUrlParser: true}, (err)=>{
    if(err){
        console.log('-----------------------------------------------------------------')
        console.log('数据库连接失败：', configObj)
        console.log('-----------------------------------------------------------------')
        return;
    }
    console.log('数据库连接成功');
})

// 声明全局变量
global.db = db