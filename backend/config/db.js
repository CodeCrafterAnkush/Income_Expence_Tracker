import mongoose from "mongoose";

export const conectDB = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/IncomeExpence").then(()=>{console.log("DB CONECTED")})
}