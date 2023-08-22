import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";


//Get
export const GET = async (req, {params}) => {
    try {
        await connectToDb();
        const prompt= await Prompt.findById(params.id).populate('creator');
        if(!prompt){
            return new Response('Prompt not found',{status: 404})
        }

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to fetch prompt", { status: 500 });
    }

}

//PATCH
export const PATCH = async (req, {params}) => {
      const {prompt,tags} =await req.json();

    try {
        await connectToDb();
        const updateprompt= await Prompt.findById(params.id).populate('creator');
       
        if(!updateprompt){
            return new Response('Prompt not found',{status: 404})
        }
        updateprompt.prompt=prompt;
        updateprompt.tags=tags;
        await updateprompt.save();
        return new Response(JSON.stringify(updateprompt), { status: 200 });

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to update prompt", { status: 500 });
    }

}

//DELETE
export const DELETE = async (req, {params}) => {
    try {
        await connectToDb();
        const deleteprompt= await Prompt.findByIdAndDelete(params.id).populate('creator');
      
        if(!deleteprompt){
            return new Response('Prompt not found',{status: 404})
        }
        return new Response(JSON.stringify(deleteprompt), { status: 200 });

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to delete prompt", { status: 500 });
    }

}