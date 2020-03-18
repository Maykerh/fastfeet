import Sequelize, { Model } from "sequelize";

class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                recipient_id: Sequelize.INTEGER,
                deliveryman_id: Sequelize.INTEGER,
                signature_id: Sequelize.INTEGER,
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipient, { foreignKey: "recipient_id" });
        this.belongsTo(models.Deliveryman, { foreignKey: "deliveryman_id" });
        this.belongsTo(models.File, {
            foreignKey: "signature_id",
            as: "signature",
        });
        this.hasMany(models.DeliveryProblems, { foreignKey: "delivery_id", as: "problems" });
    }
}

export default Order;
