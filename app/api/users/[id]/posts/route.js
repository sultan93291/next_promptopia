{
  /*
   * author: sultan ahmed sanjar
   * date : 21-07-2023
   * description : this is the back end file for get prompt function it will show all the prompts  )* to  user
   */
}

// dependencies
//internal imports
import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req,  {params}) => {
  try {
    await ConnectToDb();
    const prompts = await Prompt.find({creator:params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(`Failed to fetch all prompts`), {
      status: 500,
    });
  }
};
