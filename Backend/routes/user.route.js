import { login, logout, signup, updateUser } from "../controller/user.controller.js";
import e from "express";
import verifyUser from "../utils/verify.js";

const router = e.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',verifyUser,logout)
router.put('/update',verifyUser,updateUser)

export default router