const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');

// Call Customer Model
let User=require('../models/user');
let Cus=require('../models/customers');

router.get('/dashboard/newuser',(req,res)=>{
  res.render('newuser',{
    title:'Property Management Application',
    pageheader:'Add New Marketer'
  })
})

// Register Process
router.post('/dashboard/newuser',(req,res)=>{
  const fullname=req.body.fullname;
  const username=req.body.username;
  const email=req.body.email;
  const phoneno=req.body.phoneno;
  const password=req.body.password;
  const cpassword=req.body.cpassword;

  req.checkBody('fullname','Full name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('phoneno','Phone No is required').notEmpty();
  req.checkBody('password','Password is required').notEmpty();
  req.checkBody('cpassword','Password do not match').equals(req.body.password);

  let errors=req.validationErrors();

  if(errors){
    res.render('newuser',{
      errors:errors
    });
  }
  else {
    const newUser = new User({
      fullname:fullname,
      email:email,
      phoneno:phoneno,
      username:username,
      password:password,
      role:'marketer'
    });

    bcrypt.genSalt(10,(err,salt) =>{
      bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err){
          console.log(err);
        }
        newUser.password=hash;
        newUser.save((err)=>{
          if(err){
            console.log(err);
            return;
          }else{
            req.flash('success','New Marketer Account Added');
            res.redirect('/users/dashboard/home');
          }

        });
      });
    } );
  }

});

// Welcome Dashboard
router.get('/dashboard/welcome',ensureAuthenticated,(req,res)=>{
  Cus.find({'Marketer':req.user.fullname},(err,customer_res) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render('allcustomers', {
        title:'Property Management Application',
        customers:'Customers',
        customer_res:customer_res
      });
    }

  }).sort({$natural:-1});
});

// Marketers Details
router.get('/dashboard/marketers',ensureAuthenticated,(req,res)=>{
  User.find({'role':'marketer'},(err,marketers) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render('allmarketers', {
        title:'Property Management Application',
        customers:'Marketers',
        marketers:marketers
      });
    }

  }).sort({$natural:-1});
});

// Payment
router.get('/dashboard/payment',ensureAuthenticated,(req,res)=>{
  Cus.find({'Marketer':req.user.fullname},(err,customer_res) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render('payment', {
        title:'Property Management Application',
        customers:'Payment',
        customer_res:customer_res
      });
    }

  }).sort({$natural:-1});
});



// Login Form
router.get('/login',(req,res)=>{
  res.render('login',{
    title:'Property Management Application',
    pageheader:'Please sign in'
  });
});

// Home Dashboard
router.get('/dashboard/home',(req,res)=>{
  res.render('dashboard',{
    title:'Property Management Application',
  });
});

// Login Process
router.post('/login',(req,res,next) => {
  passport.authenticate('local',{
    successRedirect:'/users/dashboard/home',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req,res,next);
});

// Logout
router.get('/logout',(req,res) => {
  req.logout();
  req.flash('success','You have successfully logged out');
  res.redirect('/users/login');
});

// Access control
function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('danger','Please login');
    res.redirect('/users/login');
  }
}

module.exports=router;
