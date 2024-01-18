import { Router } from "express";

import bookControllers from "../controllers/book.js";
import verifyToken from '../middleware/verifyToken.js';

const bookRouter = Router();

bookRouter.get("/", bookControllers.getBooks);
bookRouter.get("/book/:id", bookControllers.getBook);
bookRouter.get("/get-user-books/:user_id", bookControllers.getBooksByUser);
bookRouter.post("/add-book/:user_id", verifyToken, bookControllers.addBook);
bookRouter.put("/update/:id", verifyToken, bookControllers.updateBook);
bookRouter.delete("/delete/:id", verifyToken, bookControllers.deleteBook);

export default bookRouter;
