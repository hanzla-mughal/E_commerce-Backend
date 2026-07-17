import Category from "../models/category.model.js";
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ message: "All categories fetch", name: category });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (name.trim() === "" || !name) {
      return res.status(400).json({ message: "Bad Request" });
    }
    console.log(req.user);
    const find = await Category.create({
      name,
      user: req.user.userID,
    });
    res.status(201).json({ message: "Category Created", category: find });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const ID = req.params.id;
    const CategoryID = req.user.userID;
    const find = await Category.findById(ID);
    console.log(find);
    if (!find) {
      return res.status(401).json({ message: "Category not found" });
    }
    if (find.user.toString() !== CategoryID) {
      return res
        .status(409)
        .json({ message: "Ony Owner can update this Category" });
    }
    const update = await Category.findByIdAndUpdate(ID, {
      name,
    });
    res
      .status(200)
      .json({ message: "Category updated suucessfully", update: update });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
export const deleteCategory=async(req,res)=>{
  try{
   const ID=req.params.id
   const userID=req.user.userID
   const find=await Category.findById(ID)
   console.log(find)
   if(!find){
    return res.status(409).json({message:"Category not found"})
   }
   if(find.user.toString()!==userID){
    return res.status(409).json({message:"You cannot delete this post"})
   }
   const del=await Category.findByIdAndDelete(ID)
   res.status(200).json({message:"Category deleted sucessfully"})

  }
  catch(err){
  res.status(500).json({error:err.message})
  }
}
