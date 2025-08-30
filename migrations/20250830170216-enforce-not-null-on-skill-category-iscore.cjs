// migrations/XXXXXXXXXXXXXX-enforce-not-null-on-skill-category-iscore.cjs
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = 'Skills'; // ajustá si tu tabla se llama distinto

    await queryInterface.sequelize.transaction(async (t) => {
      // 1) Backfill: asegurar que no queden nulls
      await queryInterface.sequelize.query(
        "UPDATE `Skills` SET `category` = 'Additional Knowledge' WHERE `category` IS NULL OR `category` = ''",
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        "UPDATE `Skills` SET `is_core` = 0 WHERE `is_core` IS NULL",
        { transaction: t }
      );

      // 2) Cambiar columnas: NOT NULL + defaults
      await queryInterface.changeColumn(
        table,
        'category',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Additional Knowledge',
        },
        { transaction: t }
      );

      await queryInterface.changeColumn(
        table,
        'is_core',
        {
          type: Sequelize.BOOLEAN, // en MySQL -> TINYINT(1)
          allowNull: false,
          defaultValue: false,
        },
        { transaction: t }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    const table = 'Skills';

    await queryInterface.sequelize.transaction(async (t) => {
      // Volver a permitir NULLs y quitar defaults
      await queryInterface.changeColumn(
        table,
        'category',
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        { transaction: t }
      );

      await queryInterface.changeColumn(
        table,
        'is_core',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: null,
        },
        { transaction: t }
      );
    });
  },
};
