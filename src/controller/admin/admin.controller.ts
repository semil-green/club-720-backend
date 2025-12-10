import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../schema/admin/admin.schema.js";

export const createNewUserController = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const checkIfEmailExists = await Admin.findOne({ email: email });

        if (checkIfEmailExists) {
            res.status(400).send({ result: "Email already exists" });
            return;
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const saveNewUser = await Admin.create({
            email: email,
            password: hashedPassword,
        });

        if (saveNewUser) {
            res.status(200).send({ result: "Admin created successfully" });
        }

    }
    catch (err) {
        res.status(400).send({ result: "Failed to ceate new user" });
    }
}

export const userLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const checkIfEmailExists = await Admin.findOne({ email: email });

        if (!checkIfEmailExists) {
            res.status(400).send({ result: "Email does not exist" });
            return;
        }

        const verifyPassword = await bcrypt.compare(
            password,
            checkIfEmailExists?.password,
        );

        if (!verifyPassword) {
            res.status(400).send({ result: "Password is incorrect" });
            return;
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const authToken = await jwt.sign(
            {
                email: checkIfEmailExists?.email,
            },
            jwtSecretKey,
            { expiresIn: "1y" },
        );

        if (authToken) {
            res
                .status(200)
                .send({ result: "Logged in successfully", auth_token: authToken });
        } else {
            res.status(400).send({ result: "Failed to login" });
        }
    } catch (error) {
        res.status(500).send({ result: "Error in user login" });
    }
};