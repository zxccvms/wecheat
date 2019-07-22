var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser') //express接受POST提交数据
const session = require('express-session')//session会话模块

require('./common/utils.js')//连接数据库
require('./models/db.js')//连接数据库

// var indexRouter = require('./routes/index');//聊天路由
var userRouter = require('./routes/user');//登陆路由

var app = express();

// view engine setup
app.use(session({
  secret: 'a123ddsf23',	  	//加密存储（加盐）
  resave: false,		  	    //客户端并行请求是否覆盖:true-是,false-否
  saveUninitialized: true  //初始化session存储
}))
app.use('/public', express.static('public')) 	      //允许静态资源被外部访问
app.set('views', path.join(__dirname, 'views'))      //设置视图目录

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/api/*', (req, res, next) => {//跨域
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

// app.use('/', indexRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
