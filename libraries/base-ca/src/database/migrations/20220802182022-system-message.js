module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('system_messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      tradeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'trades',
          key: 'id',
        },
      },
      whenSeen: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      whenDeleted: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('system_messages');
  },
};
