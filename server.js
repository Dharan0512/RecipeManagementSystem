import express from "express";
import dotenv from "dotenv"
dotenv.config();

const app = express()
const PORT = process.env.PORT || 4000


app.get('/',(req, res)=>{
    try {
        res.send("<h1>Server Working...</h1>")
    } catch (error) {
        console.error(error);
    }
})


const start = async () =>{
    try {
       app.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}...`);
        
       }) 
    } catch (error) {
        console.error(error)
    }
}


start()