import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
 export const register = async (req,res) => {
  try {
    const { email, password, name, role } = req.body;
    const find = await User.findOne({ email });
    if (find) {
       return res.status(401).json({ message: "Email already exists" });
    }
    const user = await User.create({
      password,
      email,
      name,
      role,
    });
    res.status(201).json({ message: "User registered successfully",user:user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ mesaage: err.message });
  }
};

export const login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email does not match" });
    }
    const check=await user.comparePassword(password)
    console.log(check); 

    if(!check){
        return res.status(401).json({message:"Password does not match"})
    }
    const payload = {
      userID: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
    res.json({
      message: "Login Succesfull",
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: err.message });
  }
};
