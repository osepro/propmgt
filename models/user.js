const mongoose=require('mongoose');

const user=mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneno:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  },
});

const User=module.exports=mongoose.model('User',user);
