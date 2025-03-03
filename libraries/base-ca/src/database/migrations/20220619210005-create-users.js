module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      profileColor: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      privateKeys: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
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

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
