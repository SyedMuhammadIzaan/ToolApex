import mongoose from "mongoose";
import express from "express";
import serverConfig from "./config/serverConfig.js";
import ProductRoute from "./routes/ProductRoute.js";
const Port=serverConfig.appPort; 
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("App is running...")
})
app.use("/p/",ProductRoute);

const connectDB= async()=>{
    try {
        console.log("DB Connected");
        await mongoose.connect(serverConfig.dbUrl);
    } catch (error) {
        console.log("DB Not Connected");
    }
}

app.listen(Port,()=>{
    console.log("Server is running")
    connectDB()
})