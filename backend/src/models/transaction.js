// src/models/transaction.js
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Transaction;
  };
  