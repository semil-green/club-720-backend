import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send({ result: "Access denied. Token missing." });
            return;
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

        jwt.verify(authHeader, jwtSecretKey, (err, decoded) => {
            if (err) {
                res.status(401).send({ result: "Invalid or expired token" });
                return;
            }

            (req as any).user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).send({ result: "Authentication error" });
    }
};
