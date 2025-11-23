import prisma from "../config/prisma.js";
import { successResponse, errorResponse } from "../utills/response.js";

// Get all books
const getAllBooks = async (_req, res) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                category: true
            }
        });
        return successResponse(res, 200, "Berhasil mengambil data buku", books);
    } catch (error) {
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Get book by id
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                category: true
            }
        });

        if (!book) {
            return errorResponse(res, 404, "Buku tidak ditemukan");
        }

        return successResponse(res, 200, "Berhasil mengambil data buku", book);
    } catch (error) {
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Create book
const createBook = async (req, res) => {
    try {
        const { title, author, description, publishYear, stock, categoryId } = req.body;

        const book = await prisma.book.create({
            data: {
                title,
                author,
                description,
                publishYear: parseInt(publishYear),
                stock: parseInt(stock),
                categoryId
            },
            include: {
                category: true
            }
        });

        return successResponse(res, 201, "Buku berhasil dibuat", book);
    } catch (error) {
        if (error.code === 'P2003') {
            return errorResponse(res, 400, "Kategori tidak ditemukan");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, publishYear, stock, categoryId } = req.body;

        const book = await prisma.book.update({
            where: { id },
            data: {
                title,
                author,
                description,
                publishYear: publishYear ? parseInt(publishYear) : undefined,
                stock: stock ? parseInt(stock) : undefined,
                categoryId
            },
            include: {
                category: true
            }
        });

        return successResponse(res, 200, "Buku berhasil diupdate", book);
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Buku tidak ditemukan");
        }
        if (error.code === 'P2003') {
            return errorResponse(res, 400, "Kategori tidak ditemukan");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

// Delete book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.book.delete({
            where: { id }
        });

        return successResponse(res, 200, "Buku berhasil dihapus");
    } catch (error) {
        if (error.code === 'P2025') {
            return errorResponse(res, 404, "Buku tidak ditemukan");
        }
        return errorResponse(res, 500, "Terjadi kesalahan server", error.message);
    }
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
