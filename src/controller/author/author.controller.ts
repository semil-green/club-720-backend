import { Request, Response } from "express";
import Author from "../../schema/author/author.schema";

export const addNewAuthorController = async (req: Request, res: Response) => {

    try {

        const { name, slug, status } = req.body;

        const checkIfAuthorExist = await Author.findOne({ name: name });

        if (checkIfAuthorExist) {
            res.status(400).send({ result: "Author: Firstname Lastname exists" });
            return;
        }

        const saveNewAuthor = await Author.create({
            name,
            slug,
            status
        });

        if (saveNewAuthor) {
            res.status(200).send({ result: saveNewAuthor, message: "Author: Firstname Lastname successfully" });
        }

    }
    catch (err) {
        res.status(400).send({ result: "Failed to add new author" })
    }
}


export const getAllAuthorsController = async (req: Request, res: Response) => {
    try {
        const page = Number(req.body.page || req.query.page || 1);
        const limit = Number(req.body.limit || req.query.limit || 10);
        const search = String(req.body.search || req.query.search || "").trim();

        const skip = (page - 1) * limit;

        let filter: any = {};

        if (search !== "") {
            filter = {
                $or: [
                    { name: { $regex: search, $options: "i" } }
                ]
            };
        }

        const [authors, totalAuthors] = await Promise.all([
            Author.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Author.countDocuments(filter),
        ])

        res.status(200).send({
            authors,
            pagination: {
                total: totalAuthors,
                page,
                limit,
                totalPages: Math.ceil(totalAuthors / limit),
            },
        });
    } catch (err) {
        res.status(400).send({ result: "Failed to fetch authors" });
    }
};



export const editAuthorController = async (req: Request, res: Response) => {

    try {

        const { id, name, slug, status } = req.body;

        const updateAuthor = await Author.findByIdAndUpdate(id, {
            name,
            slug,
            status
        }, { new: true });

        if (updateAuthor) {
            res.status(200).send({ result: updateAuthor, message: "Author updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to edit author" })
    }
}

export const updateAuthorStatusController = async (req: Request, res: Response) => {

    try {
        const { id, status } = req.body;

        const updateAuthorStatus = await Author.findByIdAndUpdate(id, {
            status
        }, { new: true });

        if (updateAuthorStatus) {
            res.status(200).send({ result: updateAuthorStatus, message: "Author status updated successfully" });
        }
    }
    catch (err) {
        res.status(400).send({ result: "Failed to update author status" })
    }
}