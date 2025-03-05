module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      vendorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
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
      paymentMethodId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'payment_methods',
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
      paymentMethodType: {
        type: Sequelize.ENUM(['buy', 'sell']),
        allowNull: false,
      },
      tradePricingType: {
        type: Sequelize.ENUM(['market', 'fixed']),
        allowNull: false,
      },
      tradePricingListAt: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tradePricingTradeLimitsMin: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tradePricingTradeLimitsMax: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      tradePricingTimeLimit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tradeInstructionsTags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      tradeInstructionsLabel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tradeInstructionsTerms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tradeInstructionsInstructions: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('offers');
  },
};
