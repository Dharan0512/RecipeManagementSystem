import express from "express"
const router = express.Router()
import multer from "multer";
import path from "path"
import {addRecipe, updateRecipe} from "../controller/recipeController.js"

const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, './upload')
        },

        filename: function(req, file, cb){
           cb(null, path.extname(file.originalname)) 
        }
});


const upload = multer({Storage: storage});

router.route('/').post(upload.single('image'),addRecipe)
router.route('/:id').patch(updateRecipe)
//delete recipe;

export default router;