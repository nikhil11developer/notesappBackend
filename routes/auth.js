const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Harryisagoodboy';
const {body , validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchUser');

//creating the route for user signup
router.post('/' ,[
    body('name', 'enter a valid name').isLength({min:3}),
    body('password' , 'enter a valid password').isLength({min:5}),
    body('email' , 'enter a valid email').isEmail()
] ,async(req , res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
         return res.status(400).json({errors:errors.array()})
    
    const salt = await bcrypt.genSalt(10)
    const secPass=await bcrypt.hash(req.body.password, salt)
    
    
    const user=User.create({
        name:req.body.name, password:secPass, email:req.body.email
    })
    
    const data={
        user:{
            id:user.id
        }
    }

    const jwtData=jwt.sign(data, JWT_SECRET)  
    console.log(jwtData)
    res.send("nikhil srivastava the master developer")
})

//creating the route for user login

router.post('/login' , [
    body('email' , 'enter a valid email').isEmail(),
    body('password' , 'enter a valid email').exists()    
] , async (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
        res.status(400).json({errors:errors.array()});
    
    //fetching the user with the required email
    
    const {email , password}=req.body;
    try{
        let user=await User.findOne({email})
        if(!user)
          return res.status(400).json({error:'please try to login with a valid email'});
        const passwordComapre=await bcrypt.compare(password, user.password)
        if(!passwordComapre)
           return res.status(400).json({error:'please try to login with a valid password'});
        
        const data={
            user:{
               id:user.id
            }
        }
        const authToken=jwt.sign(data, JWT_SECRET)
        res.send({authToken})
        
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'Internal server error'})
    }


})

router.post('/getuser', fetchuser , async(req, res)=>{
    try{
       const userId=req.user.id
       const user=await User.findById(userId)
       res.send({user}) 
    }catch(error){
          console.log(error.message)
          res.status(500).send('Internal server error')

    }
})

module.exports=router
