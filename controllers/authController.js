import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const registerController = async(req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name) {
      next('Name is Required')
    }
    if (!email) {
      next('Email is Required')
    }
    if (!password) {
      next('Password is Required')
    }

    // check stored data
    const existingUser = await userModel.findOne({email})
    console.log(existingUser)
    if(existingUser) {
      return res.status(200).send({
        success : true,
        message : 'Email is already taken'
      })
    } 
    // store the data
    const newUser ={
        name:name,
        email:email,
        password: bcrypt.hashSync(password)
    }

    console.log("new user..", newUser)
    const user = userModel.create(newUser)
    res.status(200).send({
        success : true,
        message: 'User registered Successfully',
        user
    })

  } catch (err) {
        next('Error in registry Controller')
  }
}


export const loginController = async (req, res, next) =>{
  try{
      const {email,password} =req.body

      if(!email || !password){
          next('Provide all Fields')
      }

      const user = await userModel.findOne({email})
      
      if(!user){
          next('Invalid Email and Password')
      }

      const isPassword = bcrypt.compareSync(password, user.password)
      if(!isPassword){
          next('Incorrect Password')
      }

      res.status(200).json({
          success : true,
          message : 'Login Successfully',
          user
      })
  
  
  }catch(err){
      next('Error in Register Controller')
  }
}


