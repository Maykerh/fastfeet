import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";

import AuthMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(AuthMiddleware);

routes.put("/users/:id", UserController.update);

routes.post("/recipients", RecipientController.store);

export default routes;
