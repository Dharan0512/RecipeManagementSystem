import express from "express";
import dotenv from "dotenv"
dotenv.config();
import morgan from "morgan";
import cors from "cors"

const app = express();



import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser"

//file system
import {dirname} from "path";
import { fileURLToPath, URL } from "url";
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//db 
import connectDB from "./db/connect.js"


// Routers
import authRoutes from "./routes/authRoutes.js"
import recipeRoutes from "./routes/recipeRoutes.js"



//env
const PORT = process.env.PORT || 4000

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}


//parse data as json format
app.use(express.json())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(cors())
//serve static files
app.use(express.static('public'))

 app.use((req, res, next)=> {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});
//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/recipe', recipeRoutes);

app.use('/static',express.static(path.join(__dirname,'public/images')))
app.use('/image/',(req,res)=>{
    res.send(express.static(path.join(__dirname, 'public')))
})

app.get('/',(req, res)=>{
    try {
        res.send("<h1>Server Working...</h1>")
    } catch (error) {
        console.error(error);
    }
})




const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
       app.listen(PORT,()=>{
        console.log(`Server is Listening on PORT ${PORT}...`);
        
       }) 
    } catch (error) {
        console.error(error)
    }
}


start();