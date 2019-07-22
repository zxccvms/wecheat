
require(process.cwd() + '/models/db.js')

// 设置数据模型
const model = db.model('user',{
	uid:{type:Number},
	email:{type:String},
	name:{type:String},
	password:{type: String},
	imgUrl:{type: String},
})

// 清空数据
model.deleteMany({}, (err) => {
    if (err) {
        console.log('users delete err')
        console.log(err)
        return
    }
    console.log('users delete success')
}) 

// 测试数据
var insertObj = new model({email:'529828486@qq.com',name:'陈检城',password:'aaa',uid:1,imgUrl:''})
insertObj.save() 
var insertObj = new model({email:'5298284861@qq.com',name:'朱建平',password:'bbb',uid:2,imgUrl:''})
insertObj.save() 
var insertObj = new model({email:'5298284862@qq.com',name:'张奇',password:'ccc',uid:3,imgUrl:''})
insertObj.save((err) => {
    if (err) {
        console.log('users insert err')
        console.log(err)
        return
    }
    console.log('users insert success')
    db.close()
}) 
