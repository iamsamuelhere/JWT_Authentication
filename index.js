require('dotenv').config()

const express=require("express")
const app=express();
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({extended:true}));
const db=require("./config/DBconfig")
app.use(cookieParser())
app.set("view engine",'ejs')

app.use("/",require("./routes/index"))

app.listen(3000,()=>{
    console.log("server started");
})