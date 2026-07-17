import express from "express"
import authenticateJWT from "../middleware/auth.middleware.js"
import { createProduct,getProduct,updateProduct,delProduct,filterProduct,searchProduct,ZA,filterPrice,asc,AZ,desc,newest,oldest } from "../controllers/product.controller.js"
import { pagination } from "../controllers/product.controller.js"
import upload from "../middleware/multer.middleware.js"
const router=express.Router()
router.post('/',authenticateJWT,upload.single('image'),createProduct)
router.get('/',getProduct)
router.put('/:id',authenticateJWT,updateProduct)
router.delete('/:id',authenticateJWT,delProduct)
router.get('/search',searchProduct)
router.get("/category",filterProduct)
router.get("/price",filterPrice)
router.get('/asc',asc)
router.get('/desc',desc)
router.get('/new',newest)
router.get('/old',oldest)
router.get('/AZ',AZ)
router.get('/ZA',ZA)
router.get("/pages",pagination)


router.get('/test',(req,res)=>{
    res.send("working");
})
export default router