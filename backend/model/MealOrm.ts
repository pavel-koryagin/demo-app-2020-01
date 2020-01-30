import { DataTypes } from 'sequelize';
import sequelize from './sequelize';
import BaseOrm from './BaseOrm';
import { UserRole } from '../../src/model/UserRole';
import { BuildOptions } from 'sequelize/types/lib/model';
import { Meal } from '../../src/model/Meal.model';

export default class MealOrm extends BaseOrm implements Meal {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: number;
  public date!: string;
  public time!: UserRole;
  public contents!: string;
  public calories!: number;

  protected whiteListedFields = [
    'id',
    'createdAt',
    'updatedAt',
    'userId',
    'date',
    'time',
    'contents',
    'calories',
  ];

  constructor(values?: object, options?: BuildOptions) {
    super(values, options);
    this.fixTypeScriptBomb();
  }
}

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
