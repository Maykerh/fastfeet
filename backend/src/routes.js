import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";
import FileController from "./app/controllers/FileController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import OrderController from "./app/controllers/OrderController";
import DeliveriesController from "./app/controllers/DeliveriesController";

import AuthMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.get("/deliveryman/:deliverymanId/deliveries", DeliveriesController.listOpened);
routes.get("/deliveryman/:deliverymanId/deliveries-finished", DeliveriesController.listFinished);

routes.put("/deliveryman/:deliverymanId/deliveries/start/:orderId", DeliveriesController.start);
routes.put("/deliveryman/:deliverymanId/deliveries/finish/:orderId", DeliveriesController.finish);

routes.use(AuthMiddleware);

routes.put("/users/:id", UserController.update);

routes.post("/recipients", RecipientController.store);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/deliveryman", DeliverymanController.index);
routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);

routes.get("/orders/", OrderController.index);
routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.delete("/orders/:id", OrderController.delete);

export default routes;
