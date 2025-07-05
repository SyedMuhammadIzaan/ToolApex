import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import corsOption from "./config/corsConfig.js";
import serverConfig from "./config/serverConfig.js";
import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import BlogRoute from "./routes/BlogRoute.js";
import CustomerReviewRoute from "./routes/CustomerReviewRoute.js";
const Port=serverConfig.appPort; 
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

//Routes
app.get("/",(req,res)=>{
    res.send("App is running...")
})
app.use("/c/",CategoryRoute);//Category Route
app.use("/p/",ProductRoute);//Product Route
app.use("/b/",BlogRoute);//Blog Route
app.use("/review",CustomerReviewRoute);//CustomerReview Route


//Connect DB
const connectDB= async()=>{
    try {
        console.log("DB Connected");
        await mongoose.connect(serverConfig.dbUrl);
    } catch (error) {
        console.log("DB Not Connected");
    }
}

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`)
    connectDB()
})