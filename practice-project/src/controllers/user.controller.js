import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    const {email, fullname, username, password} = req.body

    if(
        [fullname, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required!")
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)){
        throw new apiError(400, "Enter a valid email address.")
    }


    const existingUser = await User.findOne({     //can't use User.find() here
        $or: [{ email }, { username }]
    })
    if(existingUser) {
        throw new apiError(409, "User already exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if(!avatarLocalPath) {
        throw new apiError(400, "Please upload an avatar image!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new apiError(400, "Please upload an avatar image!")
    }

   const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
    })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")
    if(!userCreated){
        throw new apiError(500, "Something went wrong while registering the user!")
    }

    return res.status(201).json(
        new apiResponse("User successfully registered.", 200, userCreated)
    )

})

export {registerUser}