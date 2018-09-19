const mongoose=require('mongoose');

const payment=mongoose.Schema({
  custid:{
    type:String,
    required:true
  },
  amount:{
    type:String,
    required:true
  },
  dateposted:{
    type:String,
    required:true
  }
});

const Payment=module.exports=mongoose.model('Payment',payment);
