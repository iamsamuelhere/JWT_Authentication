const User =require("../models/User")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
module.exports.Home=(req,res)=>{
    res.render("Home")
}

module.exports.Login=(req,res)=>{
    res.render("login")
}



module.exports.signup=(req,res)=>{
res.render("signup")
}

module.exports.signout=(req,res)=>{
   res.cookie("jwt","",{maxAge:1})
   res.render("home")
}
module.exports.secrets=(req,res)=>{


    res.render("secrets")
}


//post controllers

module.exports.LoginPost=async(req,res)=>{ 

    User.findOne({email:req.body.email},async(err,results)=>{
        if(err)console.log(err);
        if(results==null){
            res.redirect("/signup")
        }
        else{
      const result=  await bcrypt.compare(req.body.password,results.password);
       if(result)
       {
           const token=jwt.sign({
    email:req.body.email
},process.env.JWT_SECRET,{ expiresIn: 3600 })
console.log(token)

res.cookie('jwt',token,{maxAge:60*60*1000,httpOnly:true
       })
   res.render("secrets")
        }
        else{
            res.redirect("/login")
        }
    }
})
}


module.exports.SignupPost=async(req,res)=>{

  //check user exists or not
   User.findOne({email:req.body.email},(err,results)=>{
       if(err) console.log(err)

       //no user exists
       if(results==null){
           createuser(req,res)
       }
       //user exists
     else{
         res.render("error")
     }
   })




    //create new user

    
}


const createuser=async(req,res)=>{
              const saltRounds = 10;
     await bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
      if(err) throw err;
    
  
     await  User.create({email:req.body.email,password:hash},(err)=>{
if(err) console.log(err);

const token=jwt.sign({
    email:req.body.email
},process.env.JWT_SECRET,{ expiresIn: 3600 })

res.cookie('jwt',token,{maxAge:60*60*1000,httpOnly:true})

console.log(token)

        res.render("secrets")

    })
    
        

  
     })
}
