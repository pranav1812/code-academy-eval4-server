/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // change user (uuid) column to string in content_type table
    await queryInterface.changeColumn('content_type', 'user', {
      type: Sequelize.STRING, // email
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('content_type', 'user', {
      type: Sequelize.UUID,
    });
  },
};
