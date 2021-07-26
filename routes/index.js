const router=require("express").Router();
const HomeCont=require("../controllers/Home")
const jwt=require("jsonwebtoken")
const verifyjwt=(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err) {
                console.log(err);
                res.redirect("/login")
            }
            console.log(decode);
            next();
        })
    }
    else{
        res.redirect("/login");
    }

}

const signinjwt=(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err) {
                console.log(err);
                res.redirect("/login")
            }
            console.log(decode);
            res.redirect("/secrets");
        })
    }
    else{
        next();
    }

}

router.get("/",HomeCont.Home)

router.get("/login",signinjwt,HomeCont.Login)
router.get("/signup",HomeCont.signup)
router.get("/signout",HomeCont.signout)
router.get("/secrets",verifyjwt,HomeCont.secrets)




//post routes

router.post("/signup-post",HomeCont.SignupPost)
router.post("/login-post",HomeCont.LoginPost)

module.exports=router;