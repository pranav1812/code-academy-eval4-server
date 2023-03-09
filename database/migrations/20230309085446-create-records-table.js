/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // creeate table: record: id (uuid), content_type (string, fk (references content_type table)), record (JSON), created_at (timestamp), updated_at (timestamp)
    await queryInterface.createTable('record', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      data: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('record');
  },
};
