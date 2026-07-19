import Cart from "../models/cart.model.js";
export const AddtoCart=async(req,res)=>{
    try{
        const {product,quantity}=req.body
        const ID=req.params.id
        const userId=req.user.userID
       
        const cartfind=await Cart.findOne({user:userId})
        if(!cartfind){
        const create=await Cart.create({
           cart:[{product,quantity}],
            user:userId
        })
            return res.status(201).json({ message: "Cart created", Cart: create })

    }
    else{
        const check=cartfind.cart.find(item=>item.product.toString()===product)
        if(!check){
            cartfind.cart.push({
                product,
                quantity
            })
            
        }
        else{
           check.quantity += quantity;  
        }
await cartfind.save()
    }
    return res.status(200).json({ message: "Cart updated", Cart: cartfind })

    }
    catch(err){
        consolelog(err.message)
            res.status(500).json({ error: err.message });

    }
}