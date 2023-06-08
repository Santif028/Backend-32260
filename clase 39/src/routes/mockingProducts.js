import { Router } from "express";
import { generateUser } from "../utils/utils.js";
const mockRouter = Router();

mockRouter.get("/", async (req, res) => {
    let users = [];
    for (let i = 0; i <= 100; i++) {
        users.push(generateUser());
    }
    res.send({ status: "success", payload: users })
})

export default mockRouter