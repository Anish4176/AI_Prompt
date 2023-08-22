import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, res) => {
    try {
        await connectToDb();
        const allposts= await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(allposts), { status: 201 });

    } catch (err) {
        console.log(err.message)
        return new Response("Failed to fetch all posts", { status: 500 });
    }

}