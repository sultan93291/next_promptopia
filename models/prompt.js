{
  /*
   * author: sultan ahmed sanjar
   * date : 18-07-2023
   * description : this is the prompt model file . this file will make the model for the prompts 
   */
}

// dependencies

// external imports
import  { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  prompt: {
    type: String,
    required:[true, ` prompt is required  `]
  },
  tag: {
    type: String,
    required:[true, ` tag is required  `]
  }
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

module.exports = Prompt;
