import express from "express"
const router = express.Router()
import multer from "multer";
import path from "path"
import {addRecipe, updateRecipe, singleRecipe, allRecipe, deleteRecipe} from "../controller/recipeController.js"


//TODO: study why its not working and why it return buffer..
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './upload')
//     },
    
//     filename: function(req, file, cb){
//             console.log('path',path.extname(file.filename));
//            cb(null, path.extname(file.originalname)) 
//         }
// });


// const upload = multer({Storage: storage});
const upload = multer({dest: 'upload/'});

    // upload recipe
router.route('/upload').post(upload.single('image'),addRecipe)

    //get all recipe
router.route('/:id').get(allRecipe)

    //get single recipe, update recipe, 
router.route('/:id/:id').get(singleRecipe).patch(updateRecipe).delete(deleteRecipe)

    //update single recipe
router.route('/:id/:id').patch(updateRecipe)

    //delete recipe;
router.route('/:id/:id').delete(deleteRecipe)

export default router;