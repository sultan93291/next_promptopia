{
  /*
   * author: sultan ahmed sanjar
   * date : 18-07-2023
   * description : this is the back end file for the project
   */
}

// dependencies

// external imports

import mongoose from "mongoose";

let isConnected = false; // this will allow us to track the connection

// internal imports 

export const ConnectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log(`Mongo Db is Already Connected`);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`Mongo Db Connected`);
  } catch (error) {
    console.log(error);
  }
};
