
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import {user} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {apiResponse} from "../utils/apiRresponse.js"


const registerUser=asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })
    //comments
   //get user detail  from frontend
   //validation
   //check if user already exist:username,email
   //check for images,and avatar
   //uplaod them to cloudinary,avatar
   //create user object-create entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return response
   

   //get user details from frontend
   const {fullname,email,password}=req.body
   console.log("email:",email);

//    if(fullName===""){
//     throw new apiError(400,"fullname is required")

//    }

if(
    [fullname,email,username,password].some((field)=>field?.trim()===""))
    {
        throw new apiError(400,"Allfield are complusaory or required!");

    }
    //email is vaild or not

    //check if already exist
    const existedUser= user.findOne({
        $or:[{username},  {email}]
    })
    if(existedUser){
        throw new apiError(409,"user already exist!");
    }
    //check for imagr or avatar
    const avatarLocalPath= req.files?.avatar[0]?.path
    const coverImageLocalPath= req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new apiError(400,"avatar file is reuired");
    }

    //upload to cloudinary
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400,"avatar file is reuired!");
    }

    //entry to database
    const user =await user.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
       //check if successfuly stored
   const createdUser=await user.findById(user._id).select("-password -refreshToken")
   if (!createdUser){
    throw new apiError(500,"something went wrong while registering the user");
}

//return response
return res.status(201).json(
    new  apiResponse(200, createdUser ,"user registered successfuly!")
)
}

)





export {registerUser,}
