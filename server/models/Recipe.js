import mongoose, { Schema } from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    metric: {
        type: String,
    }
   
});

const instructionSchema = new mongoose.Schema({
    step: {
        type: String,
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
        type:{
            type: String,
            required: true
        }, 
        path:{
            type: String,
        }, 
    },
    servings: {
        type: Number,
    },
    pricePerServing: {
        type: Number,
    },
    readyInMinutes: {
        type: Number
    },
    instructions:[instructionSchema],
    original: [ingredientSchema],
    likes: {
        type: Number,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


export default mongoose.model('recipe',RecipeSchema)