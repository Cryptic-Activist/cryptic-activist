module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trades', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      payment_receipt_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'payment_receipts',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      vendorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      trader_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      offer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'id',
        },
      },
      cryptocurrencyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cryptocurrencies',
          key: 'id',
        },
      },
      fiatId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'fiats',
          key: 'id',
        },
      },
      chatId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
      cryptocurrencyAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fiatAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      state: {
        type: Sequelize.ENUM([
          'ongoing',
          'canceled',
          'done',
          'error',
        ]),
        allowNull: false,
      },
      paid: {
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('trades');
  },
};
