import express, { Router } from 'express'
import {borrowedBooks,getBorrowedBooksForAdmin,recordBorrowedBook,returnBorrowedBook} from '../controllers/borrowControllers.js'
import {isAuthenticated,isAuthorized} from '../middlewares/authmiddleware.js'

const router=express.Router()

router.post("/record-borrow-book/:id",isAuthenticated,isAuthorized("Admin"),recordBorrowedBook)
router.get("/borrowed-books-by-users",isAuthenticated,isAuthorized("Admin"),getBorrowedBooksForAdmin)
router.get("/my-borrowed-books",isAuthenticated,borrowedBooks)
router.put("/return-borrowed-book/:bookId",isAuthenticated,isAuthorized("Admin"),returnBorrowedBook)


export default router;
