const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const proxy = require('http-proxy-middleware');


const indexRouter = require('./routes/index');//聊天路由
const loginRouter = require('./routes/login');//登陆路由

const app = express();

app.use('/api',proxy({
	target:'http://localhost:4001',
	changeOrigin: true
}))//2.后端代理

// view engine setup
app.use('/public', express.static('public')) 	      //允许静态资源被外部访问
app.set('views', path.join(__dirname, 'views'))      //设置视图目录
app.engine('html', require('express-art-template')) //声明模板引擎和模板后缀
app.set('view engine', 'html')						   //声明render渲染不需要写后缀

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);

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
