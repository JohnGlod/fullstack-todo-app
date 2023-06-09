const { Model, DataTypes, Deferrable } = require('sequelize');
const sequelize = require('../db')

const User = require('./user.model');

class ToDo extends Model {}

ToDo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    finishDate: {
      type: DataTypes.DATE
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'ToDo'
  }
);

module.exports = ToDo;
