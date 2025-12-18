import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TeamMember from "../../schema/team-member/teamMember.schema";


export const createNewTeamMemberController = async (req: Request, res: Response) => {

    try {
        const { name, email, password, role, status } = req.body;
        const checkIfEmailExists = await TeamMember.findOne({ email: email });

        if (checkIfEmailExists) {
            res.status(400).send({ result: "Email already exists" });
            return;
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const saveNewUser = await TeamMember.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            status: status
        });

        if (saveNewUser) {
            res.status(200).send({ result: saveNewUser, message: "Admin created successfully" });
        }

    }
    catch (err) {
        console.log("err ", err)
        res.status(400).send({ result: "Failed to ceate new user" });
    }
}

export const teamMemberLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const checkIfEmailExists = await TeamMember.findOne({ email: email });

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
                .send({ result: "Logged in successfully", auth_token: authToken, role: checkIfEmailExists?.role });
        } else {
            res.status(400).send({ result: "Failed to login" });
        }
    } catch (error) {
        res.status(500).send({ result: "Error in user login" });
    }
};


export const editTeamMemberController = async (req: Request, res: Response) => {

    try {

        const { id, name, email, role, status } = req.body;

        const updateTeamMember = await TeamMember.findByIdAndUpdate(id, {
            name,
            email,
            role,
            status
        }, { new: true });

        if (updateTeamMember) {
            res.status(200).send({ result: updateTeamMember, message: "Team member updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to edit team member" });
    }
}

export const updateTeamMemberStatus = async (req: Request, res: Response) => {

    try {

        const { id, status } = req.body;

        const updateTeamMemberStatus = await TeamMember.findByIdAndUpdate(id, {
            status
        }, { new: true });

        if (updateTeamMemberStatus) {
            res.status(200).send({ result: updateTeamMemberStatus, message: "Team member status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update team member status" });
    }
}