import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster1.rs796.mongodb.net/?retryWrites=true&w=majority&appName=myCluster1/blog-app`,
    );
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
