import { Model, DataTypes } from 'sequelize';
import sequelize from '../model/sequelize';

export default class AuthLoginDto extends Model {
  public email!: string;
  public password!: string;
}

AuthLoginDto.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
});
