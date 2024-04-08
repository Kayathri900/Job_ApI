const {CustomAPIError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware=(err,req,res,next)=>{

    let customError={
        //setting the default values 
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message|| 'something went wrong try again later'
    }
    //validation errors 
    if(err.name==='ValidationError'){
        console.log(Object.values(err.errors));
        customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode=400
    }
    //duplicate errors
    if(err.code && err.code===11000){
        customError.msg=`Duplicate values entered fof ${Object.keys(err.keyValue)} field please choose another value`
        customError.statusCode=400
    }
    //casting errors 
    if(err.name==='CastError'){
        customError.msg=`No item found with this id ${err.value}`
        customError.statusCode=404

    }
//    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg:customError.msg})

}

module.exports=errorHandlerMiddleware


