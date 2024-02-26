import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//details from the env
const username = process.env.DB_USER_NAME;
const password = process.env.DB_PWD;
const dbName = process.env.DB_NAME;

//connection string to mongo atlas
const dbUrl = `mongodb+srv://${username}:${password}@cluster0.delbuuj.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const options = {
  autoIndex: false, 
  maxPoolSize: 10, 
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000, 
  family: 4, 
};

//db connection
export const db = mongoose
  .connect(dbUrl, options)
  .then((res) => {
    if (res) {
      console.log(`Database connection successfully to ${dbName}`);
    }
  })
  .catch((err) => {
    console.log("Db connecting error: ", err);
  });
