/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // add user (uuid) column to content_type table
    await queryInterface.addColumn('content_type', 'user', {
      type: Sequelize.UUID,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('content_type', 'user');
  },
};
