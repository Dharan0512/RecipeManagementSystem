import {BadRequestError, NotFoundError} from "../errors/index.js"
import recipe from "../models/Recipe.js"
import {StatusCodes} from "http-status-codes";
import Recipe from "../models/Recipe.js";

//TODO: image should to un-comment

//add Recipe

const addRecipe = async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(req.user)
    
    
     
    const {title, servings, pricePerServing, preparationInMin, instructions, ingredients} = obj;
    console.log({"objs":title, servings, pricePerServing, preparationInMin, instructions, ingredients });
    
    if(!title ||  !instructions || !ingredients){
        res.status(StatusCodes.BAD_REQUEST).json({msg: 'please provide all values'})
        throw new BadRequestError('please provide all values')
    }
    const name = req.file.originalname
    const type = req.file.mimetype
    const path = req.file.path
    
    // const parsedIngredient = JSON.parse(ingredients)
    
    const newRecipe = await recipe.create({
        title, image:{name: name, type: type, path: path },
        servings: servings,
        pricePerServing: pricePerServing,
        readyInMinutes: preparationInMin,
        instructions: [...instructions],
        original: [...ingredients],
        author: req.user.userId
    });
    
    res.status(201).json({msg: "Recipe upload successfully"})
}


const updateRecipe = async(req, res) => {
    const {title, instructions, ingredients} = req.body;
    const {id} = req.params
    // console.log('req',req);

    if(req.file){
    var filename = req.file.originalname
    var type = req.file.mimetype
    var path = req.file.path
    } 

    const parsedIngredient = JSON.parse(ingredients)
        //set url in recipe id
    const recipe = await Recipe.findById({_id: id})

        recipe.title = title;
        if(req.file){
        recipe.image.name = filename;
        recipe.image.type = type;
        recipe.image.path = path;
        }
        recipe.instructions = instructions;
        recipe.ingredient = parsedIngredient;

        await recipe.save()
        
    res.json({msg: title, instructions, ingredients,id})
}


//get single Recipe
const singleRecipe = async(req, res) => {
    
    const {id} = req.params
    console.log(id);
    
    
    const recipe = await Recipe.findById({_id: id})
    if(!recipe){
        throw new NotFoundError("Recipe not found")
    }
    console.log({title: recipe.title, extendedIngredients: recipe.original, instructions: [...recipe.instructions]})
    res.status(StatusCodes.OK).json({msg:{title: recipe.title,image: `http://localhost:4000/static/${recipe.image.name}.jpeg`,servings: recipe.servings,pricePerServing: recipe.pricePerServing,readyInMinutes: recipe.readyInMinutes,extendedIngredients: recipe.original, instructions: [...recipe.instructions], amount: recipe.amount}})
}


//get all recipe
const allRecipe = async(req, res) => {
    console.log('all recipe working');
    const recipe = await Recipe.find()
    console.log('recipe',recipe);
    
    res.json({msg: recipe})
}


//delete Recipe
const deleteRecipe = async(req, res) => {
    const {id} = req.params;
    
    const recipe = await Recipe.findByIdAndDelete({_id: id})
    
    res.json({msg: "Deleted successfully" })
}

const userRecipe = async(req, res)=>{
    console.log('req.user',req.user);
    const {userId} = req.user
    
    const id = userId
    const recipe = await Recipe.find({author: id })
    if(!recipe){
        res.status(StatusCodes.OK).json({msg: "nothing found"})
    }
    
    res.json({msg: recipe})
    
}

export {addRecipe, updateRecipe, deleteRecipe, singleRecipe, allRecipe, userRecipe}