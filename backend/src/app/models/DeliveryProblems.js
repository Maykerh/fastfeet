import Sequelize, { Model } from "sequelize";

class DeliveryProblems extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.TEXT,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default DeliveryProblems;
