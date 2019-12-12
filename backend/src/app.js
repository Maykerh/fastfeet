import express from "express";
import routes from "./routes";
import cors from "cors";

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;
