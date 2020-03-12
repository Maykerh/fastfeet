module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("orders", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "recipients",
                    key: "id",
                },
                onUpdate: "CASCADE",
            },
            deliveryman_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "deliverymans",
                    key: "id",
                },
                onUpdate: "CASCADE",
            },
            signature_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "files",
                    key: "id",
                },
                onUpdate: "CASCADE",
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("orders");
    },
};
