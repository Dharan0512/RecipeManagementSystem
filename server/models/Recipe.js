import mongoose from "mongoose";

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
})

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
        contentType:{
            type: String,
            required: true
        },
    },
    instructions:{
        type: String,
        required: true,
    },
    ingredient: [ingredientSchema]
})


module.exports = mongoose.model('recipe',RecipeSchema);