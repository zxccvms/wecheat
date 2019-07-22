var express = require('express');
var router = express.Router();
const userModel = require(process.cwd() + "/models/user.js")
//登陆
router.post('/', function(req, res, next) {
	userModel.login(req.body.email,(err, result) => {
	  if (err) return sendJson(res, 500, '请求失败')
		if(!result[0]||req.body.password!=result[0].password) 
			return sendJson(res, 401, '账号或密码错误')
		req.session.uid=result[0]._id
	  sendJson(res, 200,'登陆成功',result)
	})
});
//是否登陆
router.get('/isLogin', (req, res, next) => {
	if(req.session.uid) return sendJson(res, 200,'已登录')
	else return sendJson(res, 401,'未登录')
});
//注册
router.get('/reg', (req, res, next) => {
	//插入的数据
	if(!req.query.email) return sendJson(res, 400, '参数错误')
	if(!req.query.name) return sendJson(res, 400, '参数错误')
	if(!req.query.password) return sendJson(res, 400, '参数错误')
	const data={
		email:req.query.email,
		name:req.query.name,
		password:req.query.password,
		imgUrl:''
	}
  // 响应数据
  userModel.reg(data,(err, result) => {
    if (err) return sendJson(res, 500, '请求失败')
		if(!result) return sendJson(res, 401, '账号已存在')
    sendJson(res, 201,'注册成功',result)
  })
});
module.exports = router;
