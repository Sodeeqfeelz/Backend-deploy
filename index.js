const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
let PORT = process.env.PORT
let URI = process.env.MONGO_URI

mongoose.connect(URI)
.then(()=>{
    console.log("mongoose is bae");
})
.catch((err)=>{
    console.log(err);
})

let userSchema = {
    item: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
}

app.get("/signup",(req,res)=>{
    res.render("signUp", {message:""})
    userModel.find()
    .then((result)=>{
        console.log(result);
        res.render('signup', {result})
    })
})

app.post("/details",(req,res)=>{
    console.log(req.body);
    let form = new userModel(req.body)
    console.log(form);
    // res.send(req.body)
    form.save()
    .then((result)=>{
        console.log("form submitted successfully");
        console.log(result);
        res.redirect("signin")
    })
    .catch((err)=>{
        console.log(err);
        if(err.code == 11000) {
            res.render("signup", {status:false, message:"Duplicate user found"})
        }else {
            res.render("signup", {status:false, message:"Please fill in appropriately"})
        }
    })
})

// app.post("/signin", (req,res)=>{
//     userModel.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//     .then((result)=>{
//         console.log(result);
//         if (result){
//             res.redirect("/details")
//         } else {
//             res.render("signin")
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

app.listen(PORT, ()=>{
    console.log(`lift off Sever as started on port ${PORT}`);
})