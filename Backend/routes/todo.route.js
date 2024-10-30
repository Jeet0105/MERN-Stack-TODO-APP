import e from "express";
import verifyUser from "../utils/verify.js";
import { deleteTodo, editTodo, getTodoById, getYourTodo, postTodo, toggleIsCompleted } from "../controller/todo.controller.js";

const router = e.Router()

router.post("/create",verifyUser,postTodo)
router.get("/get",verifyUser,getYourTodo)
router.put("/toggle-complete/:id",verifyUser,toggleIsCompleted)
router.put("/editTodo/:id",verifyUser,editTodo)
router.get("/getTodo/:id",verifyUser,getTodoById)
router.delete("/deleteTodo/:id",verifyUser,deleteTodo)

export default router
