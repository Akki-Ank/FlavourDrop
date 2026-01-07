import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://akkid98:Darkshadow@cluster0.u7djkac.mongodb.net/FlavourDrop?appName=Cluster0`).then(()=>console.log("DB Connected"));

}