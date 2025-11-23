import prisma from "../config/prisma.js";
import { successResponse, errorResponse } from "../utills/response.js";

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                books: true
            }
        });
        return successResponse(res, 200, "Berhasil mengambil data kategori", categories);
    } catch (error) {
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Get category by id
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                books: true
            }
        });

        if (!category) {
            return errorResponse(res, 404, "Kategori tidak ditemukan");
        }

        return successResponse(res, 200, "Berhasil mengambil data kategori", category);
    } catch (error) {
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Create category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        });

        return successResponse(res, 201, "Kategori berhasil dibuat", category);
    } catch (error) {
        if (error.code === 'P2002') {
            return errorResponse(res, 400, "Nama kategori sudah ada");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                description
            }
        });

        return successResponse(res, 200, "Kategori berhasil diupdate", category);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Kategori tidak ditemukan");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.category.delete({
            where: { id }
        });

        return successResponse(res, 200, "Kategori berhasil dihapus");
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Kategori tidak ditemukan");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
