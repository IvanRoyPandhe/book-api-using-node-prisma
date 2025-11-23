import jwt from "jsonwebtoken";
import { errorResponse } from "../utills/response.js";

export const verifyToken = (req, res, next) => {
    try {
        // cek token dari header Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return errorResponse(res, 'Token tidak ditemukan', null, 401);
        }

        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return errorResponse(res, 'Format token salah', null, 401);
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, 'Token sudah kadaluarsa', null, 401);
        }
        return errorResponse(res, 'Token tidak valid', null, 401);
    }
}