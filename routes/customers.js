const express=require('express');
const router=express.Router();
const dateFormat = require('dateformat');

// Call Customer Model
let Cus=require('../models/customers');

let Pay=require('../models/payment');

router.get('/register',ensureAuthenticated,(reg,res) => {
  res.render('register', {
    title:'Property Management Application',
    pageheader:'Add New Customer'
  });
});


// Call Date function
let now = new Date();

// Register Customer POST
router.post('/register',(req,res) => {
  req.checkBody('firstname','Please enter first name!!!').notEmpty();
  req.checkBody('lastname','Please enter last name!!!').notEmpty();
  req.checkBody('email','Please email is required!!!').notEmpty();
  req.checkBody('phoneno','Please enter your Phone Number!!!').notEmpty();
  req.checkBody('propertycost','Plot Cost is required!!!').notEmpty();
  req.checkBody('plotsize','Plot Size is required!!!').notEmpty();
  req.checkBody('initialdeposit','Initial Deposit is required!!!').notEmpty();
  //req.checkBody('initialdeposit','Initial Deposit is required').notEmpty();

  let errors = req.validationErrors();

  if(errors)
  {
    res.render('register',{
      title:'Property Management Application',
      pageheader:'Add New Customer',
      errors:errors
    });
  }
/* else {
}*/
  let newcus = new Cus();
  newcus.Firstname=req.body.firstname;
  newcus.Lastname=req.body.lastname;
  newcus.Email=req.body.email;
  newcus.PhoneNo=req.body.phoneno;
  newcus.Address=req.body.currentaddress;
  newcus.PropertyLocation=req.body.propertylocation;
  newcus.PlotSize=req.body.plotsize;
  newcus.PropertyCost=req.body.propertycost;
  newcus.InitialDeposit=req.body.initialdeposit;
  newcus.Balance=req.body.balance;
  newcus.PaymentType=req.body.optradio;
  newcus.Marketer=req.body.mktname;

  newcus.save((err)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    else {
      req.flash('success','New customer Successfully Added');
      res.redirect('/users/dashboard/welcome');
    }
  })
  //return;
});

// Update Customer POST
  router.post('/details/edit/:id',(req,res) => {
  req.checkBody('firstname','Please enter first name!!!').notEmpty();
  req.checkBody('lastname','Please enter last name!!!').notEmpty();
  req.checkBody('email','Please email is required!!!').notEmpty();
  req.checkBody('phoneno','Please enter your Phone Number!!!').notEmpty();
  req.checkBody('propertycost','Property Cost is required!!!').notEmpty();
  req.checkBody('initialdeposit','Initial Deposit is required!!!').notEmpty();
  //req.checkBody('initialdeposit','Initial Deposit is required').notEmpty();

  let errors = req.validationErrors();

  if(errors)
  {
    res.render('register',{
      title:'Property Management Application',
      pageheader:'Register Page',
      errors:errors
    });
  }
  else {
  }
  let newcus = {};

  newcus.Firstname=req.body.firstname;
  newcus.Lastname=req.body.lastname;
  newcus.Email=req.body.email;
  newcus.PhoneNo=req.body.phoneno;
  newcus.Address=req.body.currentaddress;
  newcus.PropertyLocation=req.body.propertylocation;
  newcus.PropertyCost=req.body.propertycost;
  newcus.InitialDeposit=req.body.initialdeposit;
  newcus.Balance=req.body.balance;

  let query = {_id:req.params.id}

  Cus.updateOne(query,newcus,(err)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    else {
      req.flash('success','Customer Successfully Updated');
      res.redirect('/users/dashboard/welcome');
    }
  })
  //return;
});

router.delete('/delete/:id',(req,res) => {

let query={_id:req.params.id}

Cus.deleteOne(query,(err) => {
  if(err){
    console.log(err)
  }
  req.flash('success','Customer Successfully Deleted');
  res.send('Success');
});

});


// Edit Customer Details
router.get('/details/edit/:id',ensureAuthenticated,(req,res) => {
  Cus.findById(req.params.id,(err,cus_detail) =>{
    res.render('customeredit',{
      title:'Property Management Application',
      pageheader:'Edit Customer Details',
      cus_detail:cus_detail
    });
  });
});

// Make Payment
router.get('/makepayment/edit/:id',ensureAuthenticated,(req,res) => {
  Cus.findById(req.params.id,(err,cus_detail) =>{
    res.render('makepayment',{
      title:'Property Management Application',
      pageheader:'Make Payment',
      cus_detail:cus_detail
    });
  });
});

// Post Payment
  router.post('/makepayment/edit/:id',(req,res) => {
  req.checkBody('amount','Please enter amount!!!').notEmpty();
  //req.checkBody('initialdeposit','Initial Deposit is required').notEmpty();

  let errors = req.validationErrors();

  if(errors)
  {
    res.render('makepayment',{
      title:'Property Management Application',
      pageheader:'Make Payment',
      cus_detail:cus_detail,
      errors:errors
    });
  }
  else {
  }
  let newpay = new Pay();
  myDateString = dateFormat(now, "dd-mm-yyyy")
  newpay.custid=req.body.custid;
  newpay.amount=req.body.amount;
  newpay.dateposted=myDateString;

  let query = {_id:req.params.id}

  newpay.save((err)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    else {
      req.flash('success','Payment Successfully Updated');
      res.redirect('/users/dashboard/payment');
    }
  })
  //return;
});


// Get More Details about Customer
router.get('/details/:id',(req,res) => {
  Cus.findById(req.params.id,(err,cus_detail) =>{
    res.render('details',{
      title:'Property Management Application',
      pageheader:'Customer Details',
      cus_detail:cus_detail
    });
  });
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
