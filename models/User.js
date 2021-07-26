const mongoose=require("mongoose")
const bycrypt=require('bcrypt');

const userSchema= new mongoose.Schema({
    email:String,
    password:String
})
// userSchema.pre('save',function(req,res,next){

// console.log(this.password)
// let saltRounds=10;
// bycrypt.hash(this.password,saltRounds,(err,hash)=>{
// if(err)console.log(err)
// this.password=hash
// console.log(this.password)
// })
// next();

// })


const User=mongoose.model("User",userSchema);

module.exports=User;