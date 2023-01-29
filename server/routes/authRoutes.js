import express from "express";
const router = express.Router();

//import rateLimiter for production use;

import {
    register,
    login,
    updateUser, 
    getCurrentUser, 
    logout
} from "../controller/authController.js"

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/logout', logout);

router.route('/updateUser').patch(updateUser)
router.route('/getCurrentUser').get(getCurrentUser)


export default router;