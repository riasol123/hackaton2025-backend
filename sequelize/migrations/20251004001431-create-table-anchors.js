'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('anchors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      x_coord: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      y_coord: {
        allowNull: false,
        type: Sequelize.DOUBLE()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('anchors');
  }
};
