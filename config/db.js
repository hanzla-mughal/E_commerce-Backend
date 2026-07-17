import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is running");
  } catch (err) {
    console.log("MongoDB not connected", err.message);
    process.exit(1);
  }
};
export default connectDB;
