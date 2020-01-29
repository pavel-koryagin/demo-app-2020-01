import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

export default class MealOrm extends Model {}

MealOrm.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Meal',
  tableName: 'meals',
});
