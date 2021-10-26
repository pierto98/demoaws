var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var session = require("express-session");
//var MySqlSession = require("express-mysql-session")(session);
var logger = require('morgan');
//var mysqlsession = new MySqlSession(require("./mysql.json"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*
app.use(session({
  name: "node-session-express",
  secret: "secretforcryptedmessagesfromsessionmodule",
  resave: false,
  saveUninitialized: false,
  //store: mysqlsession,  //sets mysqlsession object
  cookie: {
    maxAge: 1*60*30/60*60*1000 //30 min
  }
}));*/
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(function(req, res, next){
  console.log("req.session before update", req.session);
  req.session.cookie.maxAge=11*60*1000; //11min
  console.log("req.session after update", req.session);
  next();
});*/

app.use('/', indexRouter);
app.use('/users', usersRouter);


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

app.listen(3000, function(){
  console.log("express helloworld recibiendo http en puerto 3000");
});

module.exports = app;
