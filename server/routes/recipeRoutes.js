import express from "express"
const router = express.Router()

import {addRecipe, updateRecipe} from "../controller/recipeController.js"

router.route('recipe').post(addRecipe)
router.route('recipe/:id').patch(updateRecipe)
//delete recipe;

export default router;