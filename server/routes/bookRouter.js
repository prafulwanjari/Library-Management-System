import { isAuthenticated,isAuthorized } from "../middlewares/authmiddleware.js";
import { addBook,deleteBook,getAllbooks } from "../controllers/bookContollers.js";
import express from 'express'

const router=express.Router()

router.post("/admin/add",isAuthenticated,isAuthorized("Admin"),addBook)
router.get('/all',isAuthenticated,getAllbooks)
router.delete('/delete/:id',isAuthenticated,isAuthorized("Admin"),deleteBook)

export default router