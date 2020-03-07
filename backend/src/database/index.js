import Sequelize from "sequelize";
import User from "../app/models/User";
import Recipient from "../app/models/Recipient";
import databaseConfig from "../config/database";

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        User.init(this.connection);
        Recipient.init(this.connection);
    }

    mongo() {}
}

export default new Database();
