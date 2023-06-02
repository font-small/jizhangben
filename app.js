var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account');
const userRouter = require('./routes/web/auth');

// session 写入相关中间件
const session = require('express-session');
const MongoStore = require('connect-mongo');
// 导入配置项
const {DBHOST,DBPORT,DBNAME} = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// session
app.set('trust proxy', 1) // trust first proxy


app.use(session({
    name: 'sid', // 设置cookie 的name,默认值是connect.sid
    secret: 'atxiaozhang', // 参与加密的字符串（又称签名）
    resave: true, // 是否在每次请求时重新保存 session  20 分钟    4:00  4:20
    saveUninitialized: false, // 是否在每次请求都设置一个cookie来存储 session的id
    store: MongoStore.create({
        mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` //数据库的连接配置
    }),
    cookie: {
        // secure: true
        httpOnly:true,  // 开启后前端无法通过 JS 操作
        maxAge: 1000 * 300 * 24 * 7  // 这一条 是控制 sessionID 的过期时间的！！！
    }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',userRouter);
app.use('/api',accountRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 1、自己设置404
  res.render('404');
  // 2、公益404
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
