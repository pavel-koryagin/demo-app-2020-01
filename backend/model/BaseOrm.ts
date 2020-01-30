import _pick from 'lodash/pick';
import _forEach from 'lodash/forEach';
import { Model } from 'sequelize';
import Auth from '../utils/Auth';

export default class BaseOrm extends Model {
  protected whiteListedFields!: string[];

  public getWhiteListedFields(auth: Auth | null = null) {
    return _pick(this, this.whiteListedFields);
  }

  toJSON(): object {
    return this.getWhiteListedFields();
  }

  /**
   * This must be called in ancestor's constructor
   * TypeScript assigns default values to fields after parent's constructor. Including undefined
   */
  protected fixTypeScriptBomb() {
    // @ts-ignore - previous() typing is wrong. So disabling typescript check here
    _forEach(this.previous(), (value, key: any) => {
      if (value !== undefined) {
        this.set(key, value);
      }
    });
  }
}
