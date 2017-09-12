var express = require('express');
var path = require('path');
var hbs = require('hbs');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbs.__express);
app.set('view engine', 'html');
app.use('/static', express.static('static'));



////////////////////////////////////////////////////////

//session 设置
app.use(session({
  secret:'secret',
  cookie:{
    maxAge:24*60*60*1000
  },
  resave:true,
  saveUninitialized: true
}));


var admin = require('./routes/admin/index');
var login = require('./routes/admin/login');
var api = require('./routes/admin/api/index');

app.use('/admin',admin);
app.use('/login',login);


app.use('/api',api)


////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;