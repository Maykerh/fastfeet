"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("recipients", [
            {
                name: "João da silva",
                street: "Avenida das flores",
                number: 75,
                complement: "Casa",
                state: "Santa Catarina",
                city: "Joinville",
                cep: "89999-999",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: queryInterface => {
        return queryInterface.bulkDelete("recipients", null, {});
    },
};
