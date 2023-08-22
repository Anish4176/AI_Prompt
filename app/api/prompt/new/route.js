import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST= async (req,res) =>{
   
    const {UserId, prompt,tags} =await req.json();
    try{      
            await connectToDb();
            console.log(UserId, prompt, tags);
            const NewPrompt= new Prompt({
                creator:UserId, 
                prompt,
                tags
            })
            await NewPrompt.save();
            return new Response(JSON.stringify(NewPrompt),{status:201});
        
    }catch(err){
        console.log(err.message)
        return new Response("Failed to create a new Prompt",{status:500});      
    }
   
}