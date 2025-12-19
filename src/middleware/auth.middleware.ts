import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/roles";
interface JwtPayload {
    role: Role;
}

interface RequestWithUser extends Request {
    user?: JwtPayload;
}

export const verifyAuthTokenAndRole =
    (allowedRoles: Role[] = []) =>
        (req: RequestWithUser, res: Response, next: NextFunction): void => {
            try {
                const token = req.headers.authorization;

                if (!token) {
                    res.status(401).json({ message: "Token is missing" });
                    return;
                }

                const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

                jwt.verify(token, jwtSecretKey, (err, decoded) => {
                    if (err) {
                        res.status(401).json({ message: "Invalid or expired token" });
                        return;
                    }

                    const payload = decoded as JwtPayload;

                    if (
                        allowedRoles.length &&
                        !allowedRoles.includes(payload.role)
                    ) {
                        res.status(403).json({ message: "Unauthorized role" });
                        return;
                    }

                    req.user = payload;
                    next();
                });
            } catch {
                res.status(500).json({ message: "Authentication error" });
            }
        };
