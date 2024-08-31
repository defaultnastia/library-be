import * as fs from "node:fs/promises";
import path from "node:path";

const booksPath = path.resolve("data", "books.json");

const rewriteBooks = async (newBooks) => {
  await fs.writeFile(booksPath, JSON.stringify(newBooks, null, 2));
};

export const getBooks = async () => {
  const allBooks = await fs.readFile(booksPath);

  return JSON.parse(allBooks);
};

export async function addBook({ title, author, isBorrowed }) {
  const books = await getBooks();
  const newBook = {
    isbn: Date.now(),
    title,
    author,
    isBorrowed,
  };
  books.push(newBook);

  await rewriteBooks(books);

  return newBook;
}

export const updateBook = async (isbn, data) => {
  const books = await getBooks();
  const index = books.findIndex((book) => book.isbn === isbn);

  if (index === -1) return null;

  books[index] = { ...books[index], ...data };
  await rewriteBooks(books);

  return books[index];
};

export const removeBook = async (isbn) => {
  const books = await getBooks();
  const index = books.findIndex((book) => book.isbn === isbn);

  if (index === -1) return null;

  const removedBook = books.splice(index, i);
  await rewriteBooks(books);

  return removedBook;
};

export const updateIsBorrowed = async (isbn, isBorrowed) => {
  const books = await getBooks();
  const index = books.findIndex((book) => book.isbn === isbn);

  if (index === -1) return null;

  books[index].isBorrowed = isBorrowed;
  await rewriteBooks(books);

  return books[index];
};

export const getBookByQuery = async (query) => {
  const books = await getBooks();

  if (books.length === 0) return [];

  const queriedBooks = books.filter((book) => {
    book.title.contains(query) || book.isbn.contains(query);
  });

  return queriedBooks;
};
