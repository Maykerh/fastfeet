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

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: "delivery_id" });
    }
}

export default DeliveryProblems;
