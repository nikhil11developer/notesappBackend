const jwt=require('jsonwebtoken')
const JWT_SECRET = 'Harryisagoodboy';

const fetchuser=(req , res , next)=>{
    const token=req.header('authToken')
    if(!token)
        res.status(401).json({message:'please authenticaten using a valid token'})
    
    try{
        const data=jwt.verify(token , JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).json({message:'please authenticate using a valid token'})
    }
}

module.exports=fetchuser