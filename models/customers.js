const mongoose = require('mongoose');

let customersSchema = mongoose.Schema({
  Firstname:{
    type: String,
    required: true
  },
  Lastname:{
    type: String,
    required: true
  },
  Email:{
    type: String,
    required: true
  },
  PhoneNo:{
    type: String,
    required: true
  },
  Address:{
    type: String,
    required: false
  },
  PropertyLocation:{
    type: String,
    required: false
  },
  PlotSize:{
    type: Number,
    required: true
  },
  PropertyCost:{
    type: Number,
    required: false
  },
  InitialDeposit:{
    type: Number,
    required: false
  },
  Balance:{
    type: Number,
    required: false
  },
  PaymentType:{
    type: String,
    required: false
  },
  Marketer:{
    type: String,
    required: true
  }
});

let customers = module.exports = mongoose.model('Customers',customersSchema);
