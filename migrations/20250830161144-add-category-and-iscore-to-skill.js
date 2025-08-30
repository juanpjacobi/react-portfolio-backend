
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Skills', 'category', {
    type: Sequelize.STRING,
    allowNull: true, // primero nullable
  });
  await queryInterface.addColumn('Skills', 'is_core', {
    type: Sequelize.BOOLEAN,
    allowNull: true, // primero nullable
    defaultValue: null,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('Skills', 'category');
  await queryInterface.removeColumn('Skills', 'is_core');
}
