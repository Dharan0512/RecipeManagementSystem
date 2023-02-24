import express from "express"
const router = express.Router()
import multer, { diskStorage } from "multer";
import path from "path"
import {addRecipe, updateRecipe, singleRecipe, allRecipe, deleteRecipe, userRecipe} from "../controller/recipeController.js"
import auth from "../middleware/auth.js"

//TODO: study why its not working and why it return buffer..
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/')
    },
    
    filename: function(req, file, cb){
           cb(null, path.basename(file.originalname)+"." + 'jpeg') 
        }
});



const upload = multer({storage: storage});
// const upload = multer({dest: 'public/images/'},{Storage: diskStorage({
//     filename: function(req,file,cb){
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })});

    // upload recipe
router.route('/upload').post(auth,upload.single('image'),addRecipe)

    //get all recipe
router.route('/').get(allRecipe)
router.route('/myrecipe').get(auth,userRecipe)

    //get single recipe, update recipe, 
router.route('/:id').get(singleRecipe).patch(upload.single('image'),updateRecipe).delete(deleteRecipe)

export default router;