import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send({ result: "Access denied. Token missing." });
            return;
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        jwt.verify(authHeader, jwtSecretKey, (err, decoded) => {
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
