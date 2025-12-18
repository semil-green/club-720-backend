"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send({ result: "Access denied. Token missing." });
            return;
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        jsonwebtoken_1.default.verify(authHeader, jwtSecretKey, (err, decoded) => {
            if (err) {
                res.status(401).send({ result: "Invalid or expired token" });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(500).send({ result: "Authentication error" });
    }
};
exports.authMiddleware = authMiddleware;
