{
  /*
   * author: sultan ahmed sanjar
   * date : 18-07-2023
   * description : this is the user model file . this file will make the model for user details
   */
}

// dependencies

// external imports

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email  is already existed"],
  },
  username: {
    type: String,
    required: [true, " username is required"],
  },
  image: {
    type: String,
    
  },
});

const User = models.User || model("User", userSchema);

module.exports = User;
