import express from "express";
import validateBody from "../decorators/validateBody.js";
import * as schemas from "../schemas/booksSchemas.js";
import booksControllers from "../controllers/booksControllers.js";

const createBookValidation = validateBody(schemas.createBookSchema);
const updateBookValidation = validateBody(schemas.updateBookSchema);
const updateBookStatusValidation = validateBody(schemas.updateBookStatusSchema);

const booksRouter = express.Router();

booksRouter.get("/", booksControllers.getAllBooks);

booksRouter.post("/", createBookValidation, booksControllers.addBook);

booksRouter.put("/:isbn", updateBookValidation, booksControllers.updateBook);

booksRouter.delete("/:isbn", booksControllers.deleteBook);

booksRouter.patch(
  "/:isbn/borrow",
  updateBookStatusValidation,
  booksControllers.updateBookStatus
);

booksRouter.get("/search", booksControllers.searchBooks);

export default booksRouter;
