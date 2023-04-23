const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db')

const User = require('./user.model');

class Token extends Model {}

Token.init(
  {
    user: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    refreshToken: { type: DataTypes.STRING(500), allowNull: false }
  },
  {
    sequelize,
    modelName: 'Token',
    timestamps: false
  }
);

module.exports = Token;
