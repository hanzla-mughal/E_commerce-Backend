import { getCategory,createCategory,updateCategory ,deleteCategory} from "../controllers/category.controller.js";
import express from "express"
import authenticateJWT from "../middleware/auth.middleware.js"
const router=express.Router()
router.get('/',getCategory)
router.post('/',authenticateJWT,createCategory)
router.put('/:id',authenticateJWT,updateCategory)
router.delete('/:id',authenticateJWT,deleteCategory)
export default router