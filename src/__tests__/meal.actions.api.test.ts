import { internalRequest, JWT_GUEST } from '../../.tests/apiFramework';
import { resetDatabase } from '../../backend/model/resetDatabase';
import { mealsSample } from '../qa/samples/Meal.samples';

beforeEach(async () => {
  await resetDatabase();
});

describe('/meals/', () => {

  it('lists all for guest', async () => {
    // Arrange
    // Act
    const response = await internalRequest(JWT_GUEST, 'GET', '/meals/');

    // Assert
    expect(response._getStatusCode()).toBe(200);
    const data = JSON.parse(response._getData());
    expect(data.length).toBe(mealsSample.length);
    expect(data).toContainEqual(expect.objectContaining(mealsSample[0]));
  });
});
