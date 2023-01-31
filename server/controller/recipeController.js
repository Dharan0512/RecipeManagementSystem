import {BadRequestError} from "../errors/index.js"
import recipe from "../models/Recipe.js"
import {StatusCodes} from "http-status-codes";


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

const updateRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;

    res.json({msg: name, instruction, indegredients})
}

export {addRecipe, updateRecipe}