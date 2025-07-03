import dotenv from "dotenv";

dotenv.config();

const config=({
    appPort:process.env.PORT || 3006,
    dbUrl:process.env.DB_URL,
})

export default config;