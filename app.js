import express from "express"
import cors from "cors"
import routes from "./routes/user.routes.js"
import router from "./routes/category.routes.js"
import product from "./routes/product.routes.js"
import cart from "./routes/cart.routes.js"
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/auth',routes)
app.use('/api/category',router)
app.use('/api/product',product)
app.use('/api/cart',cart)
 
app.use((err,req,res,next)=>{
     console.error(err);

    res.status(500).json({
        success: false,
        message: err.message
    });
})
export default app