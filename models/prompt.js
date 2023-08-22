import { Schema,model,models } from "mongoose";

const Promptschema= new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true,'Prompt is required']
    },
    tags:{
        type:String,
        required:[true,'Tag is required']
    }
})
const Prompt= models.Prompt ||  model('Prompt',Promptschema);
export default Prompt;