var createError = require('http-errors');
var express = require('express');
var path = require('path'); //获取到当前路径
var cookieParser = require('cookie-parser'); //cookie信息转换
var logger = require('morgan'); //日志输出
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
// app.set('view engine', 'jade');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    //console.log("req.cookies", req.cookies);
    if (req.cookies.userId) {
        next();
    } else {
        //console.log("req.cookies.userId为false");
        //未登录时，不能加入购物车，goods/addCart
        if (req.originalUrl == '/users/login' 
        || req.originalUrl == '/users/logOut' 
        || req.originalUrl.indexOf('/goods/list')>-1 ) {//请求商品列表时，/goods后面还有很多参数
            //方法二 req.path =='/goods/list'
            //console.log("req.originalUrl", req.originalUrl);
            next();
        } else {
            //console.log("无权限访问");
            res.json({
                status: '10001',
                msg: '未登录',
                result: ''
            });
        }
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/goods', goodsRouter);

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
