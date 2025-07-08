import dotenv from "dotenv";

dotenv.config();

const config=({
    appPort:process.env.PORT || 3006,
    dbUrl:process.env.DB_URL,
    jwtSecret:process.env.JWT_SECRET,
    email:process.env.EMAIL_USER,
    password:process.env.EMAIL_PASS,
})

export default config;