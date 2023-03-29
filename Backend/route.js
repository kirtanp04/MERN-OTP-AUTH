const express = require("express")
const {Signup,EmailVerification, Login, otpVerification, getUser} = require("./controller")
const router = express.Router()



router.post("/signup",Signup)
router.post("/verification",EmailVerification)
router.post("/login",Login)
router.post("/otp",otpVerification)
router.get("/user",getUser)



module.exports = router