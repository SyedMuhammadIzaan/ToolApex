import serverConfig from "./config/serverConfig.js";
import express from "express";
const Port=serverConfig.appPort; 
const app=express();


app.get("/",(req,res)=>{
    res.send("App is running...")
})

const connectDB= async()=>{
    try {
        console.log("DB Connected");
        
    } catch (error) {
        
    }
}

app.listen(Port,()=>{
    console.log("Server is running")
    connectDB()
})