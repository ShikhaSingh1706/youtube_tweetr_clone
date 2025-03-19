const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}




// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try{

//         await fn(req,res,next)
//     }catch(error){
//         res.staqtus(err.code||500).json({
//             sucess:false,
//             message:error.message
//         })
//     }
// }
