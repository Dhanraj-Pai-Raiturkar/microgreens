import mongoose from "mongoose"

export default async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/microgreens")
        console.log("connected to mongoDB")
    }catch(error){
        console.error("mongodb connection error", error)
        throw error
    }
}