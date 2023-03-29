const mongoose = require("mongoose")

const createDatabase = async() =>{
    try{
        const URL = process.env.DB_URL
        await mongoose.connect(URL)
        .then(()=>{
            console.log("Database is connected")
        })

    }catch(e){
        console.log(e)
    }
}

module.exports = createDatabase