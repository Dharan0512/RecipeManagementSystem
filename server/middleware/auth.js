import jwt from "jsonwebtoken"
import { UnAuthenticatedError } from "../errors/index.js"


const auth = async (req, res, next)=>{
    
    const token = req.headers.authorization;
    console.log(!token || !token.startsWith('Bearer'));
    
    if(!token || !token.startsWith('Bearer')){
        throw new UnAuthenticatedError(`Authentiated Invalid`)
    }
    const authToken = token.split(" ")[1]
    console.log('authtoken',authToken);
    
    try {
       const payload = jwt.verify(authToken, process.env.JWT_SECRET);
       
       const testUser = payload.userId === "23424242424e42324"
       req.user = {userId: payload.userId, testUser}
       next();
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
}

export default auth;