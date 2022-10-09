import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://karam05341:karam05341@cluster0.ymyi8.mongodb.net/mern-project?retryWrites=true&w=majority"
  );

  console.log("Mongo DB connection successful");
}

export default connectDB;
