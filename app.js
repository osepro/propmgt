const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const expressValidator=require('express-validator');
const flash=require('connect-flash');
const session=require('express-session');
const config=require('./config/database');
const passport=require('passport');


mongoose.connect(config.database);

let db = mongoose.connection;

// Check DB connection
db.once('open',() => {
  console.log('Connected Successfully to MongoDB');
})


// Check for DB error
db.on('error', (err) => {
  console.log(err);
});

// Call Models
let Cus=require('./models/customers');

// Init App
const app=express();

// Load View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator());﻿

// Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*',(req,res,next) => {
  res.locals.user=req.user || null;
  next();
});


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home Route
app.get('/',(req,res) => {
      res.render('login', {
        title:'Property Management Application',
        pageheader:'Please sign in'
        });
  });

// Route Files
let newCustomer = require('./routes/customers');
let users = require('./routes/users');
app.use('/customer',newCustomer);
app.use('/users',users);


// Start Server
app.listen(5000,() => {
  console.log('Server started on port 5000 .....')
})
