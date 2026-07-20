import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
export const AddtoCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user.userID;
    const find = await Product.findById(product);
    if (!find) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cartfind = await Cart.findOne({ user: userId });
    if (!cartfind) {
      const create = await Cart.create({
        cart: [{ product: find._id, quantity }],
        user: userId,
      });
      return res.status(201).json({ message: "Cart created", Cart: create });
    } else {
      const check = cartfind.cart.find(
        (item) => item.product.toString() === product,
      );
      if (!check) {
        cartfind.cart.push({
          product,
          quantity,
        });
      } else {
        check.quantity += quantity;
      }
      await cartfind.save();
    }
    return res.status(200).json({ message: "Cart updated", Cart: cartfind });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
//GET CART
export const getCart=async(req,res)=>{
  try{
    const userId=req.user.userID
    
    const find=await Cart.find({user:userId}).populate('cart.product')
    if(find.length==0){
      return res.status(404).json({message:"Cart not found"})
    }
    res.status(200).json({ message: "Cart fetch", Cart: find });

  }
  catch(err){
        console.log(err.message);
        res.status(500).json({ error: err.message });
    

  }
}