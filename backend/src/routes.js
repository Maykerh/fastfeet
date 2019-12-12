import { Router } from "express";

import UserController from "./app/controllers/UserController";

const routes = new Router();

routes.get("/", (req, res) => res.status(200).json("Deu bom"));

routes.post("/users", UserController.store);
routes.put("/users", UserController.update);

module.exports = routes;
