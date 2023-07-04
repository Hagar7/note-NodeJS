

let stackVar;

 const asyncHandler = (API)=>{
 return (req,res,next) =>{
    API(req,res,next).catch(err =>{
        stackVar = err.stack
        next(new Error(err.message))
    })
 }
}


 const globalHandling = (err,req,res,next)=>{
    if(err){
      if(process.env.ENV_Mode == "DEV"){
       return  res.status(err['cause'] || 500).json({
          message:"fail response",
          Error:err.message,
          stack:stackVar
      })
      }
      return  res.status(err['cause'] || 500).json({
        message:"fail response",
        Error:err.message.Error,
    })
    }
    }


export {
    globalHandling,
    asyncHandler
}