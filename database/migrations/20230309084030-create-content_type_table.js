/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create table: content_type: id (uuid), content_type (string), created_at (timestamp), updated_at (timestamp)
    await queryInterface.createTable('content_type', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // drop table: content_type
    await queryInterface.dropTable('content_type');
  },
};
