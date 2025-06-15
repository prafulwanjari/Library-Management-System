// import mongoose from "mongoose";

// export const connectDB=async ()=>{
//     mongoose.connect(process.env.MONGO_URI,{
//         dbName:"Mern_Stack_Library_Management_System"
//     })
//     .then(() => {
//         console.log("Database connected successfully")
//     })
//     .catch((err) => {
//       console.log("Error connecting to Database",err)
//     })
//     }

import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    const connection = await mongoose.connect(mongoUri, {
      dbName: "Mern_Stack_Library_Management_System",
    });

    const dbName = connection.connection.name;
    const dbHost = connection.connection.host;
    const env = process.env.NODE_ENV || 'development';
    const dbType = mongoUri.includes("mongodb+srv") ? "Atlas (Production)" : "Local";

    console.log("\n MongoDB Connection Successful!");
    console.log(` Connection Type: ${dbType}\n`);

  } catch (err) {
    console.error(" Error connecting to MongoDB:", err.message);
    process.exit(1); // Stop server on DB failure
  }
};