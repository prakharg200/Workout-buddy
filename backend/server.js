require("dotenv").config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    next()
})

//invoking routes
app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to the port")
        })
    })
    .catch(error =>{
        console.log(error)
    })

//listen for requests
