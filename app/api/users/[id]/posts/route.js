import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDb();
        const allposts= await Prompt.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(allposts), { status: 201 });

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to fetch all posts", { status: 500 });
    }

}