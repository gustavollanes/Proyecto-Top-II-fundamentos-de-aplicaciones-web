var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
const { clear } = require('console');
const { query } = require('express');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'novels'
});

module.exports = connection;

connection.connect();

global.db = connection;

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//Rutas           
app.get('/', routes.index)
app.get('/register', user.register);
app.post('/register', user.register);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/bienvenido', user.bienvenido);
app.get('/home/cerrarsesion', user.cerrarsesion);
app.get('/newnovel', user.newnovel);
app.post('/newnovel', user.newnovel);
app.get('/viewnovel',user.viewnovel);

app.listen(8080)