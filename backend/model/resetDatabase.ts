import sequelize from './sequelize';
import { mealsSample } from '../../src/qa/samples/Meal.samples';
import MealOrm from './MealOrm';
import UserOrm from './UserOrm';
import { backendUserExtrasSample, usersSample } from '../../src/qa/samples/User.samples';

export async function resetDatabase() {
  // Reset structure
  await sequelize.sync({ force: true });

  // Seed with demo data
  await MealOrm.bulkCreate(mealsSample);
  await UserOrm.bulkCreate(usersSample.map(user => ({
    ...user,
    ...backendUserExtrasSample,
  })));
}
