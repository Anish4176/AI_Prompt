import {Schema,model,models} from 'mongoose';

//SCHEMA
const UserSchema= new Schema({
    email:{
        type:'String',
        unique:['true','Email already exists'],
        required:['true',"Email id is required"]
    },
    username:{
        type:'String',
        required:['true','Username is required'],
        
    },
    image:{
        type:'String'
    }
})

//model
const User= models.User || new model('User',UserSchema);

export default User;