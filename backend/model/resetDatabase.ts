import sequelize from './sequelize';
import { mealsSample } from '../../src/qa/samples/Meal.samples';
import MealOrm from './Meal.orm';

export async function resetDatabase() {
  // Reset structure
  await sequelize.sync({ force: true });

  // Seed with demo data
  await MealOrm.bulkCreate(mealsSample);
}
