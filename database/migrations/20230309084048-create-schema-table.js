/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create table: schema: id (uuid), schema (JSON), content_type (string, fk (references content_type table)) ,created_at (timestamp), updated_at (timestamp)
    await queryInterface.createTable('schema', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      schema: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      contentTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'content_type',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('schema');
  },
};
