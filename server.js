import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './database/conn..js'
import route from './route/authRoute.js'
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'
import jobRoute from './route/jobRoute.js'

const app =express()

dotenv.config()

//middleware
app.use(cors())
app.use(express.json())
app.use("/api",route)
app.use("/api",jobRoute)



app.use(errorMiddleware)

//mongodb connection
connectDB()

//port
const PORT =process.env.PORT || 5000


app.listen(PORT,() =>[
    console.log(`listening to the ${PORT}`)
])

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

