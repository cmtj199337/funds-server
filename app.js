var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var ejs = require('ejs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contentRouter = require('./routes/content');

var app = express();

app.use(bodyParser.urlencoded({ extended: false,limit:'3072kb'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 一级路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/content', contentRouter);

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

// app.use(function (req, res, next) {
//   // 登陆和注册不需要token，其他的请求都需要进行token校验 
//   if (req.url != '/user/login' && req.url != '/user/register') {
//       let token = req.headers.token;
//       let jwt = new JwtUtil(token);
//       let result = jwt.verifyToken();
//       // 如果考验通过就next，否则就返回登陆信息不正确
//       if (result == 'err') {
//           res.send({status: 403, msg: '登录已过期, 请重新登录'})
//       } else {
//           next();
//       }
//   } else {
//       next();
//   }
// });

module.exports = app;
