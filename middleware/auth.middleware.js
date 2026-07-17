import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
  return  res.status(401).json({ message: "Header missing " });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
   res.status(401).json({ message: "Invalid or expire token" });
  }
};
export default authenticateJWT;
