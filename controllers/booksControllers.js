import * as booksServices from "../services/booksServices.js";
import controllerWrapper from "../decorators/controllerWrapper.js";
import requestError from "../helpers/requestError.js";

const getBooks = async (_, res) => {
  const result = await booksServices.getBooks();
  res.json(result);
};

const addBook = async (req, res) => {
  const data = req.body;
  const result = await booksServices.addBook(data);

  res.status(201).json(result);
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length)
    throw requestError(400, "Add at least one property to the body");

  const result = await booksServices.updateBook(id, data);

  if (!result) throw requestError(404, "Not found");

  res.json(result);
};

const removeBook = async (req, res) => {
  const { id } = req.params;
  const result = await booksServices.removeBook(id);

  if (!result) throw HttpError(404, "Not found");

  res.json(result);
};

const updateBookStatus = async (req, res) => {
  const { isbn } = req.params;
  const data = req.body;

  if (!("isBorrowed" in data))
    throw HttpError(400, "Body must contain key: isBorrowed");

  const result = await booksServices.updateIsBorrowed(isbn, data.isBorrowed);

  if (!result) throw requestError(404, "Not found");

  res.json(result);
};

const getBookByQuery = async (req, res) => {
  const { query } = req.params;
  const result = await booksServices.getBookByQuery(query);

  if (!result) throw requestError(404, "Not found");

  res.json(result);
};

export default {
  getBooks: controllerWrapper(getBooks),
  addBook: controllerWrapper(addBook),
  updateBook: controllerWrapper(updateBook),
  removeBook: controllerWrapper(removeBook),
  updateBookStatus: controllerWrapper(updateBookStatus),
  getBookByQuery: controllerWrapper(getBookByQuery),
};
