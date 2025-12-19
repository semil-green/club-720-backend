"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthTokenAndRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthTokenAndRole = (allowedRoles = []) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "Token is missing" });
            return;
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        jsonwebtoken_1.default.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }
            const payload = decoded;
            if (allowedRoles.length &&
                !allowedRoles.includes(payload.role)) {
                res.status(403).json({ message: "Unauthorized role" });
                return;
            }
            req.user = payload;
            next();
        });
    }
    catch {
        res.status(500).json({ message: "Authentication error" });
    }
};
exports.verifyAuthTokenAndRole = verifyAuthTokenAndRole;
