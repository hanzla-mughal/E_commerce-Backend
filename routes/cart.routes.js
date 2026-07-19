import { AddtoCart } from "../controllers/cart.controller.js";
import express from "express"
import authenticateJWT from "../middleware/auth.middleware.js";
const router=express.Router()
router.post('/',authenticateJWT,AddtoCart)
export default router