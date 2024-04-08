const User=require('../models/user')
const jwt=require('jsonwebtoken')
const { UnauthenticatedError}= require('../errors')

const auth=(req,res,next)=>{
    //check header 
    const authHeader=req.headers.authorization
    if(!authHeader|| !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid 1')
    }
    const token=authHeader.split(' ')[1]
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        //ATTACH THE USER TO THE JOB ROUTES 
        console.log('payload',payload);
        req.user={userId:payload.userId,name:payload.name}
        next()
    } catch (error) {
        console.log('calling 2nd error');
        throw new UnauthenticatedError('Authentication invalid ')
    }
}

module.exports=auth