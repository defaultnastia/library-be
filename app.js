import express from "express";
import cors from "cors";
import booksRouter from "./routes/booksRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use API on port: 3000");
});
