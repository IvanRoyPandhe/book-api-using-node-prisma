import express from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// protected routes (perlu login)
router.post("/", verifyToken, createBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
