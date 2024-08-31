import * as booksServices from "../services/booksServices.js";
import controllerWrap from "../decorators/controllerWrap.js";
import requestError from "../helpers/requestError.js";

const getAllBooks = async (_, res) => {
  const result = await booksServices.getAllBooks();
  res.json(result);
};

const addBook = async (req, res) => {
  const data = req.body;
  const result = await booksServices.addBook(data);

  res.status(201).json({
    createdBook: result,
  });
};

const updateBook = async (req, res) => {
  const { isbn } = req.params;
  const data = req.body;

  if (!Object.keys(data).length)
    throw requestError(400, "Add at least one property to the body");

  const result = await booksServices.updateBook(isbn, data);

  if (!result) throw requestError(404, "Not found");

  res.json({
    updatedBook: result,
  });
};

const deleteBook = async (req, res) => {
  const { isbn } = req.params;
  const [result] = await booksServices.deleteBook(isbn);

  if (!result) throw requestError(404, "Not found");

  res.json({
    removedBook: result,
  });
};

const updateBookStatus = async (req, res) => {
  const { isbn } = req.params;
  const data = req.body;

  if (!("isBorrowed" in data))
    throw requestError(400, "Body must contain key: isBorrowed");

  const result = await booksServices.markAsBorrowed(isbn, data.isBorrowed);

  if (!result) throw requestError(404, "Not found");

  res.json({
    updatedBook: result,
  });
};

const searchBooks = async (req, res) => {
  const { query } = req.query;

  const result = await booksServices.searchBooks(query);

  if (!result) throw requestError(404, "Not found");

  res.json(result);
};

export default {
  getAllBooks: controllerWrap(getAllBooks),
  addBook: controllerWrap(addBook),
  updateBook: controllerWrap(updateBook),
  deleteBook: controllerWrap(deleteBook),
  updateBookStatus: controllerWrap(updateBookStatus),
  searchBooks: controllerWrap(searchBooks),
};
