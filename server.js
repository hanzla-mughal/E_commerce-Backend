import dotenv  from "dotenv";
dotenv.config()
console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME)
console.log("Cloudinary Name:", process.env.CLOUDINARY_API_KEY)
console.log("Cloudinary Name:", process.env.CLOUDINARY_SECRET_KEY)
import app from "./app.js"
import connectDB from "./config/db.js";


await connectDB()
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})