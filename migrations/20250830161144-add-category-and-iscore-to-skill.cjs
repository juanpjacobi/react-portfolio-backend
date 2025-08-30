
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Skills', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Skills', 'is_core', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Skills', 'category');
    await queryInterface.removeColumn('Skills', 'is_core');
  }
};
