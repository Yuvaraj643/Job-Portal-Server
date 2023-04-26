import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
            console.log("Connected to MONGODB")  
    }catch(error){
        console.log(`Error : ${error}`)
    }
}

export default connectDB