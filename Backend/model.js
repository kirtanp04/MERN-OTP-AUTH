const mongoose = require("mongoose")


const newSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
},{
    timestamps:true,
})


const otpSchema = new mongoose.Schema({
    userId:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require :true
    },
    code:{
        type:String,
        require: true
    },
})

const Model = mongoose.model("Data",newSchema)
const Otp = mongoose.model("OTP",otpSchema)

module.exports = {Model, Otp}