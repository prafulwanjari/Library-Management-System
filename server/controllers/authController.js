import { error } from "console";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { sendVerificationCode } from "../utills/sendVerificationCode.js";
import { sendToken } from "../utills/sendToken.js";
import { sendEmail } from "../utills/sendEmail.js";
import { generateForgotPasswordemailTemplate } from "../utills/emailTemplates.js";


export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please Enter Your field. ", 400))
        }
        const isRegistered = await User.findOne({ email, accountVerified: true });
        if (isRegistered) {
            return next(new ErrorHandler("User Already exist. ", 400))
        }

        const registraionAttemptsByUser = await User.find({
            email,
            accountVerified: false
        })
        if (registraionAttemptsByUser.length > 5) {
            return next(new ErrorHandler("You have exceed the number of registration attempts. please contact support. ", 400))
        }

        if (password.length < 8 || password.length > 16) {
            return next(new ErrorHandler("password must between 8 t0 16 characters. ", 400))
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        const verificationCode = await user.generateVerificationCode();
        await user.save()
        sendVerificationCode(verificationCode, email, res)

    } catch (error) {
        next(error)
    }
});

export const verifyOtp = catchAsyncErrors(async (req, res, next) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return next(new ErrorHandler("Email or Otp is Missing. ", 400))
        }
        const userAllEntries = await User.find({
            email,
            accountVerified: false
        }).sort({ createdAt: -1 })

        if (!userAllEntries) {
            return next(new ErrorHandler("User not found. ", 404))
        }

        let user
        if (userAllEntries.length > 1) {
            user = userAllEntries[0]
            await User.deleteMany({
                _id: { $ne: user._id },
                email,
                accountVerified: false
            })

        }
        else {
            user = userAllEntries[0]
        }

        if (user.verificationCode !== Number(otp)) {
            return next(new ErrorHandler("Invalid OTP", 400))
        }
        const currentTime = Date.now()
        const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime()

        if (currentTime > verificationCodeExpire) {
            return next(new ErrorHandler("OTP Expired", 400))
        }
        user.accountVerified = true;
        user.verificationCode = null
        user.verificationCodeExpire = null
        await user.save({ validateModifiedOnly: true })

        sendToken(user, 200, "Account Verified", res)

    } catch (error) {
        return next(new ErrorHandler("Internal server Error. ", 500))
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email || !password){
      return  next(new ErrorHandler("Please Enter all fields. ",400))
    }
    const user= await User.findOne({email,accountVerified:true}).select("+password")
    
    if(!user){
     return  next(new ErrorHandler("Invalid email or password",400))
    }

    const ispasswordMatched=await bcrypt.compare(password,user.password)

    if(!ispasswordMatched){
      return  next(new ErrorHandler("Invalid email or password",400))
    }
    sendToken(user,200,"user login successfully",res)
})

// export const logout=catchAsyncErrors(async(req,res,next)=>{
//     res.status(200).cookie("token","",{
//         expires:new Date(Date.now()),
//         httpOnly:true
//     }).json({
//         success:true,
//         message:"Logged out successfully"
//     })
// })

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
  .status(statusCode)
  .cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
    path: "/", // ✅ Add this
  })
  .json({
    success: true,
    user,
    message,
    token,
  });
});

export const getUser=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user   
    })
})

export const forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)


    if(!req.body.email){
       return next(new ErrorHandler("Email is required. ",400))
    }
    const user= await User.findOne({
        email:req.body.email,
        accountVerified:true
    })

    console.log('his')

    if(!user){
       return  next(new ErrorHandler("Invalid email. ",400))
    }
    const resetToken=user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message=generateForgotPasswordemailTemplate(resetPasswordUrl)
    try {
        await sendEmail({
            email:user.email,
            subject:"Bookworm Library management System Password recovery",
            message
        });
        
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
        
    }

})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // Validate presence of password fields
    if (!password || !confirmPassword) {
        return next(new ErrorHandler("Please provide password and confirm password", 400));
    }

    // Check password match
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password do not match", 400));
    }

    // Check password length
    if (password.length < 8 || password.length > 16) {
        return next(new ErrorHandler("Password must be between 8 to 16 characters", 400));
    }

    // Hash token
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    // Send new token after password reset
    sendToken(user, 200, "Password reset successfully", res);
});

export const updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user._id).select("+password");
    const {currentPassword,newPassword,confirmNewPassword}=req.body;

    if(!currentPassword || !newPassword || !confirmNewPassword){
   return next((new ErrorHandler("Please select all the fields ",400)))
    }

    const isPasswordMatched=await bcrypt.compare(currentPassword,user.password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Current Password is incorrect",400))
    }
    if(newPassword.length<8 || newPassword.length>16 || confirmNewPassword.length<8 || confirmNewPassword.length>16){
       return next(new ErrorHandler("Password must be 8 to 16 character. ",400))
    } 

    if(newPassword!==confirmNewPassword){
         return next(new ErrorHandler("newPassword and confirmNewpassword do not matched. ",400))
    }

    const hashPassword=await bcrypt.hash(newPassword,10)
    user.password=hashPassword;
    
    await user.save()

    res.status(200).json({
        success:true,
        message:"Password Updated Successfully"
    })
    
})