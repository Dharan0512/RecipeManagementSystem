import mongoose from "mongoose";

const ingredientSchema = {
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
}

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        name:{
            type: String,
            required: true
        },
        data:{
            type: Buffer,
            required: true
        },
        type:{
            type: String,
            required: true
        } 
    },
    // instructions:{
    //     type: String,
    //     required: true,
    // },
    // ingredient: [ingredientSchema]
})


export default mongoose.model('recipe',RecipeSchema)