"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("deliverymans", [
            {
                name: "Manoel entregador",
                email: "teste@teste.com",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("deliverymans", null, {});
    },
};
