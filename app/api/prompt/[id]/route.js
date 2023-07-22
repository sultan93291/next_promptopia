{
  /*
   * author: sultan ahmed sanjar
   * date : 21-07-2023
   * description : this is the back end file for get data and delete or update user posts
   */
}

// dependencies
//internal imports
import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";
// get function
export const GET = async (req, { params }) => {
  try {
    await ConnectToDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response(`Can't Find a Prompt `, {
        status: 404,
      });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(`Failed to fetch all prompts`, {
      status: 500,
    });
  }
};

// patch () function

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await ConnectToDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response(`Prompt not Found `, {
        status: 404,
      });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(JSON.stringify(existingPrompt)), {
      status: 200,
    });
  } catch (e) {
    return new Response(`Failed to update Prompts `, {
      status: 500,
    });
  }
};

// DELETE /prompts function

export const DELETE = async (req, { params }) => {
  try {
    await ConnectToDb();
    await Prompt.findByIdAndRemove(params.id);
    return new Response(`Prompt Deleted Successfully `, {
      status: 200,
    });
  } catch (e) {
    return new Response(`Failed to Delete Prompts `, {
      status: 500,
    });
  }
};
