import express from "express"
import {registerController,loginController} from "../controllers/authController.js"


const route = express.Router()

route.post('/register',registerController)

route.post('/login', loginController)

route.get('/protected',(req,res)=>{
    const userId = req.userId;
})

export default route