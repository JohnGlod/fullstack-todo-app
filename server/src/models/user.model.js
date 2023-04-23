const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false
  }
);
User.belongsTo(User, { as: 'manager' });

(async () => {
  await sequelize.sync({ force: true });
})();

module.exports = User;
