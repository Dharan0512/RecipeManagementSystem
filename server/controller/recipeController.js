import {BadRequestError} from "../errors/index.js"
import recipe from "../models/Recipe.js"
import * as fs from "fs";
import {StatusCodes} from "http-status-codes";


const addRecipe = async (req, res) => {
    console.log('req',req.file);
    
    const {title} = req.body;
    console.log({title});
    
    const name = req.file.originalname
    const buffer = req.file.buffer
    const type = req.file.mimetype
    
    // if(!title ||  !instruction || !indegredients){
    //     throw new BadRequestError('please provide all values')
    // }

    const newRecipe = await recipe.create({
        title, image:{name: name, data: buffer, type: type}
    });
    
    res.status(201).json({msg: "Recipe upload successfully"})
}

const updateRecipe = async(req, res) => {
    const {name, instruction, indegredients} = req.body;

    res.json({msg: name, instruction, indegredients})
}

export {addRecipe, updateRecipe}