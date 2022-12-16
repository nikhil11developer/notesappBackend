const express = require('express');
const router = express.Router();

router.get('/' , (req , res)=>{
    obj={
        name:'nikhil' , subject:'java' , profile:'technical trainer'
    }
    console.log(req.body)
})

module.exports=router
