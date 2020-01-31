import { DataTypes } from 'sequelize';
import sequelize from './sequelize';
import BaseOrm from './BaseOrm';
import { UserRole } from '../../src/model/UserRole';
import { User } from '../../src/model/User.model';
import { BuildOptions } from 'sequelize/types/lib/model';
import { comparePassword, hashPassword } from '../utils/crypt';

export default class UserOrm extends BaseOrm implements User {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: UserRole;
  public dailyTarget!: number | null;
  private password!: string;

  protected whiteListedFields = [
    'id',
    'createdAt',
    'updatedAt',
    'email',
    'firstName',
    'lastName',
    'role',
    'dailyTarget',
  ];

  constructor(values?: object, options?: BuildOptions) {
    super(values, options);
    this.fixTypeScriptBomb();
  }

  async validatePassword(value: string) {
    return comparePassword(value, this.password);
  }

  async setPassword(value: string) {
    if (value) {
      this.password = await hashPassword(value);
      console.log(this.password);
    }
  }
}

UserOrm.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(UserRole.Regular, UserRole.Manager, UserRole.Admin),
    defaultValue: UserRole.Regular,
    allowNull: false,
  },
  dailyTarget: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});
