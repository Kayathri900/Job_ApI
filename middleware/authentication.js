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
        const testUser=payload.userId==='661703b822ecf1466cfda176'
        req.user={userId:payload.userId,name:payload.name,testUser}
        next()
    } catch (error) {
        console.log('calling 2nd error');
        throw new UnauthenticatedError('Authentication invalid ')
    }
}

module.exports=auth