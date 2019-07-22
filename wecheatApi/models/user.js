// 设置数据模型
const model = db.model('user',{
	email:{type:String},
	name:{type:String},
	password:{type: String},
	imgUrl:{type: String},
})
/* 
列表页：访问 - /模块名	         （get）
详情页：访问 - /模块名/编号      （get）
添加页：访问 - /模块名/create   （get）
处  理：访问 - /模块名           （post）
修改页：访问 - /模块名/编号/edit（get） 
处  理：访问 - /模块名/编号      （put）	
删  除：访问 - /模块名/编号      （delete） 
*/
// 登陆
const login = (email,callbak) => {
    model.find({email}, {}, (err, result) => {
			console.log(result)
        if (err) return callbak(err)
				callbak(null,result)
    })
}
//注册
const reg = (data,callbak) => {
		model.find({email:data.email}, {}, (err, result) => {
		    if (err) return callbak(err)
				if(result[0]) return callbak(null,false)
				const insertObj = new model(data)
				insertObj.save((err, result) => {
				    if (err) return callbak(err)
						callbak(null,result)
				})
		})
} 
//修改用户信息
// const login = (email,callbak) => {
//     model.find({email}, {}, (err, result) => {
//         if (err) return callbak(err)
// 				callbak(null,result)
//     })
// }
module.exports = {
    login,
		reg
}