import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// protected routes (perlu login)
router.post("/", verifyToken, createCategory);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

export default router;
