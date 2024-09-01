import path from "node:path";
import * as fs from "node:fs/promises";
import requestError from "../helpers/requestError.js";

const booksPath = path.resolve("data", "books.json");

const rewriteBooks = async (newBooks) => {
  await fs.writeFile(booksPath, JSON.stringify(newBooks, null, 2));
};

export const getAllBooks = async () => {
  const allBooks = await fs.readFile(booksPath);

  return JSON.parse(allBooks);
};

const isBookUnique = (isbn, books) => {
  const existingBook = books.find(
    (book) => book.isbn.toLowerCase() === isbn.toLowerCase()
  );

  if (existingBook) return false;

  return true;
};

export async function addBook({ title, author, isbn, isBorrowed = false }) {
  const books = await getAllBooks();
  const isUnique = isBookUnique(isbn, books);

  if (!isUnique)
    throw requestError(409, "The ISBN of the book has to be unique");

  const newBook = {
    isbn,
    title,
    author,
    isBorrowed,
  };
  books.push(newBook);

  await rewriteBooks(books);

  return newBook;
}

export const updateBook = async (isbn, data) => {
  const books = await getAllBooks();

  const index = books.findIndex((book) => book.isbn === isbn);
  if (index === -1) return null;

  books[index] = { ...books[index], ...data };
  await rewriteBooks(books);

  return books[index];
};

export const deleteBook = async (isbn) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.isbn === isbn);

  if (index === -1) return null;

  const removedBook = books.splice(index, 1);
  await rewriteBooks(books);

  return removedBook;
};

export const markAsBorrowed = async (isbn, isBorrowed) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.isbn === isbn);

  if (index === -1) return null;

  books[index].isBorrowed = isBorrowed;
  await rewriteBooks(books);

  return books[index];
};

export const searchBooks = async (query) => {
  const books = await getAllBooks();

  if (books.length === 0) return [];

  const queriedBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.toLowerCase().includes(query.toLowerCase())
    );
  });

  return queriedBooks;
};
