const {Model,Otp} = require("./model")
// const SendMail = require("./sendEmail")
const nodemailer = require("nodemailer")



const Signup = async(req,res)=>{
    const {name,phone,email,pass} = req.body
    try{
        const mail = await Model.findOne({email:email})
        if(mail){
            res.send({mess:"exist"}).status(404)
        }else{
            await Model.create({
                name:name,
                phone:phone,
                email:email,
                password:pass
            })
            res.send({mess:"created"}).status(202)
        }

    }catch(e){
        res.send({mess:"server error"})
    }

}


const EmailVerification = async(req,res) => {
    const {forgetPass} = req.body
    const num = Math.floor(Math.random()*10000 + 1)
    
		
    try{
        const verify = await Model.findOne({email:forgetPass})
        if(verify){
            const data = {
                userId : verify._id,
                email: forgetPass,
                code:num
            }
            await Otp.insertMany(data)
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.USER,
                    pass:process.env.PASS
                } 
            });
            const mailOptions = {
                from : process.env.USER,
                to : forgetPass,
                subject : "Password recovery",
                html : `<h1> your code is </h1> ` + num
            }
            transporter.sendMail(mailOptions, (err,info)=>{
                if(err){
                    console.log(err).status(404)
                }else{
                    res.status(200).send({mess:"sent",id:verify._id})
                }
            })
            setTimeout(async()=>{
                await Otp.findOneAndDelete({email:forgetPass})
            },60000)
        }else{
            res.send({mess:"NO account"})
        }

    }catch(e){
        console.log(e)
    }

}




const Login =async(req,res)=>{

    const {email,pass} = req.body
    try{
        const check = await Model.findOne({email:email})
        if(check){ const pa = check.password
            if(pass === check.password){

                res.send({mess:"user find"}).status(202)
            }else{
                res.send({mess:"wrong pass"}).status(404)
            }
        }else{
            res.send({mess:"no account find"})
        }
    }catch(e){
        res.send({mess:e}).status(404)
    }

}


const otpVerification= async(req,res) =>{
    const {ids,one,two,three,four} = req.body
    try{
       const id = await Otp.findOne({userId:ids,code:one+two+three+four})
        if(id){
            res.send({mess:"otp matched"}).status(202)
        }else{
            res.send({mess:"wronge otp"}).status(404)
        }
    }catch(e){
        res.send({mess:e}).status(404)
    }
}


const getUser = async(req,res)=>{
    try{
       const data = await Model.find({})
        res.send(data).status(202)
    }catch(e){
        res.send(e).status(404)
    }
}



module.exports = {Signup, EmailVerification, Login, otpVerification, getUser}