import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { error } from "console";
export const createProduct = async (req, res) => {
  try {
    const { name, description, stock, price, category } = req.body;
    // const  image= req.file.filename
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Image upload failed" });
    }
    const user = req.user.userID;

    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const create = await Product.create({
      name,
      description,
      stock,
      price,
      image: [{ url: result.secure_url, public_id: result.public_id }],
      category: foundCategory._id,
      user,
    });
    fs.unlinkSync(req.file.path);
    console.log(req.body);
    console.log(req.file);
    res.status(201).json({ message: "Product created", category: create });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    console.log("GET product hit");
    const product = await Product.find()
      .populate("category")
      .populate("user", "name email");
    res.status(200).json({ message: "Product fetch", product: product });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const ID = req.params.id;
    const find = await Product.findById(ID);
    const userId = req.user.userID;
    if (!find) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (find.user.toString() != userId) {
      return res
        .status(404)
        .json({ message: "You cannot update this product" });
    }
    const update = await Product.findByIdAndUpdate(
      ID,
      {
        name,
        description,
        price,
        stock,
      },
      {
        new: true,
      },
    );
    res
      .status(200)
      .json({ message: "Product update sucessfully", Update: update });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const delProduct = async (req, res) => {
  try {
    const ID = req.params.id;
    const find = await Product.findById(ID);
    const userId = req.user.userID;
    if (!find) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (find.user.toString() != userId) {
      return res
        .status(404)
        .json({ message: "You cannot update this product" });
    }
    const del = await Product.findByIdAndDelete(ID);
    res.status(200).json({ message: "Product delted succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      res.status(401).json({ message: "Status required" });
    }
    const find = await Product.find({
      name: {
        $regex: q,
        $options: "i",
      },
    });
    res.status(200).json({ Find: find });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const filterProduct = async (req, res) => {
  try {
    const { m } = req.query;
    const find = await Product.find({
      category: req.query.m,
    });
    if (!find) {
      res.status(401).json({ message: "Category not found" });
    }
    res.status(200).json({ Category: find });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const filterPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const find = await Product.find({
      price: {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      },
    });
    if (find.length === 0) {
      return res
        .status(401)
        .json({ message: "Product not found under these prices" });
    }
    res.status(200).json({ Product: find });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
export const asc = async (req, res) => {
  try {
    const product = await Product.find({}).sort({
      price: 1,
    });
    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const desc = async (req, res) => {
  try {
    const product = await Product.find({}).sort({
      price: -1,
    });
    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const newest = async (req, res) => {
  try {
    const product = await Product.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const oldest = async (req, res) => {
  try {
    const product = await Product.find({}).sort({
      createdAt: 1,
    });
    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const AZ = async (req, res) => {
  try {
    const product = await Product.find({}).sort("name");

    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const ZA = async (req, res) => {
  try {
    const product = await Product.find({}).sort("-name");

    res.status(200).json({ Product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const pagination = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);
    const find = await Product.find({}).skip(skip).limit(limit);
    res.status(200).json({
      Products: find,
      pagination: {
        totalItems: total,
        TotalPages: totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateImage = async (req, res) => {
  const ID = req.params.id;
  let result;
  const product = await Product.findById(ID);
  const oldPublicID = product.image[0].public_id;
  if (oldPublicID) {
    try {
      await cloudinary.uploader.destroy(oldPublicID, {
        invalidate: true,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(401).json({ error: err.message });
    }
  }

  try {
    result = await cloudinary.uploader.upload(req.file.path, {
      overwrite: true,
      invalidate: true,
    });

    const update = await Product.findByIdAndUpdate(
      ID,
      {
        image: [
          {
            url: result.secure_url,
            public_id: result.public_id,
          },
        ],
      },
      { new: true },
    );
    res
      .status(200)
      .json({ message: "image Update succesfully", Update: update });
    fs.unlink(req.file.path);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
