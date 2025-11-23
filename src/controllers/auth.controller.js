import prisma from "../config/prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utills/response.js";
import { cookieOptions } from "../utills/cookieOption.js";

// register
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        // validasi input
        if (!name || !email || !password) {
            return errorResponse(res, 400, 'Semua field harus diisi');
        }
        
        // cek email
        const emailExisted = await prisma.user.findUnique({
            where: { email }
        });

        if (emailExisted) {
            return errorResponse(res, 400, 'Email sudah terdaftar');
        }
        
        // hash password
        const hashed = await bcrypt.hash(password, 10);

        // simpan user baru ke database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed
            }
        });

        return successResponse(res, 201, 'Registrasi berhasil', {
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        return errorResponse(res, 500, 'Terjadi kesalahan server', error.message);
    }
}

// login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // validasi input
        if (!email || !password) {
            return errorResponse(res, 400, 'Email dan password harus diisi');
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return errorResponse(res, 401, 'Email atau password salah');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return errorResponse(res, 401, 'Email atau password salah');
        }

        // buat jwt token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // set cookie
        res.cookie('token', token, cookieOptions);

        return successResponse(res, 200, 'Login berhasil', {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        return errorResponse(res, 500, 'Terjadi kesalahan server', error.message);
    }
}

// logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return successResponse(res, 200, 'Logout berhasil');
    } catch (error) {
        return errorResponse(res, 500, 'Terjadi kesalahan server', error.message);
    }
}