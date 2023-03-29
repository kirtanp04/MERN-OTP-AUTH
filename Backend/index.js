const express = require("express")
const cors = require("cors")
require("dotenv").config()
const createDatabase = require("./db")
const router = require("./route")
const app = express()
app.use(express.json())
app.use(cors())
const PORT= process.env.PORT || 8000
createDatabase()



app.use("/",router)





app.listen(PORT,()=>{
    console.log("server is running")
})

