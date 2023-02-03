import {BadRequestError} from "../errors/index.js"
import recipe from "../models/Recipe.js"
import {StatusCodes} from "http-status-codes";
import Recipe from "../models/Recipe.js";

//TODO: image should to un-comment

//add Recipe

const addRecipe = async (req, res) => {
    
    const {title, instructions, ingredients} = req.body;
    console.log({title, instructions, ingredients, });
    
    // const name = req.file.originalname
    // const type = req.file.mimetype
    // const path = req.file.path
    
    // if(!title ||  !instructions || !ingredients){
    //     throw new BadRequestError('please provide all values')
    // }
        
    const newRecipe = await recipe.create({
        title, image:{name: "null", type: "null", path: "null" },
        instructions: instructions, ingredient: [...ingredients]
    });
    
    res.status(201).json({msg: "Recipe upload successfully"})
}


//update Recipe TODO: need to test
const updateRecipe = async(req, res) => {
    const {name, instructions, ingredients} = req.body;
    
    
    // const name = req.file.originalname
    // const type = req.file.mimetype
    // const path = req.file.path
    
    // if(!title ||  !instructions || !ingredients){
    //     throw new BadRequestError('please provide all values')
    // }

        //set url in recipe id
    const recipe = await Recipe.findOne({_id: req.recipeId})

        recipe.title = title;
        recipe.image.name = "null";
        recipe.image.type = "null";
        recipe.image.path = "null"; 
        recipe.instructions = instructions;
        recipe.ingredient = [...ingredients];

        await recipe.save()
        
    res.json({msg: name, instruction, indegredients})
}


//get single Recipe
const singleRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;
    


    res.json({msg: name, instruction, indegredients})
}


//get all recipe
const allRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;
    


    res.json({msg: name, instruction, indegredients})
}


//delete Recipe
const deleteRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;
    


    res.json({msg: name, instruction, indegredients})
}


export {addRecipe, updateRecipe, deleteRecipe, singleRecipe, allRecipe}