import Sequelize from "sequelize";
import mongoose from "mongoose";

import User from "../app/models/User";
import Recipient from "../app/models/Recipient";
import File from "../app/models/File";
import Deliveryman from "../app/models/Deliveryman";
import Order from "../app/models/Order";
import DeliveryProblems from "../app/models/DeliveryProblems";

import databaseConfig from "../config/database";

const models = [User, Recipient, Deliveryman, Order, File, DeliveryProblems];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect("mongodb://localhost:27017/fastfeet", {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        });
    }
}

export default new Database();
