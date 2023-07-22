{
  /*
   * author: sultan ahmed sanjar
   * date : 21-07-2023
   * description : this is the back end file for create prompt back end
   */
}

// dependencies
//internal imports
import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";
// external imports

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await ConnectToDb();
    const newPrompt = new Prompt({ creator: userId, tag: tag, prompt: prompt });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (e) {
    return new Response(`Failed to Create a new Prompt `, {
      status: 500,
    });
  }
};
