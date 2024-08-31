# library-be

library-be is a back-end application written with node.js and express that
provides CRUD operations for the books collection.

interface Book { isbn: string; title: string; author: string; isBorrowed:
boolean; }

CRUD:

- GET /api/books
- POST /api/books
- PUT /api/books/:isbn
- DELETE /api/books/:isbn
- PATCH /api/books/:isbn/borrow
