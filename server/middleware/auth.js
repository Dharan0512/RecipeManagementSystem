import jwt from "jsonwebtoken"
import { UnAuthenticatedError } from "../errors/index"


const auth = async (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        throw new UnAuthenticatedError(`Authentiated Invalid`)
    }
    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET);
       const testUser = payload.userId === "23424242424e42324"
       req.user = {userId: payload.userId, testUser}
       next();
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }
}

export default auth;