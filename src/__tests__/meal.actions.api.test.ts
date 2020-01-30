import {
  internalRequest,
  JWT_ALICE_ADMIN, JWT_BOB_MANAGER,
  JWT_CAROL_REGULAR_USER,
  JWT_GUEST,
} from '../../.tests/apiFramework';
import { resetDatabase } from '../../backend/model/resetDatabase';
import { mealsSample } from '../qa/samples/Meal.samples';

beforeEach(async () => {
  await resetDatabase();
});

describe('/meals/', () => {

  it('lists all for admin', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_ALICE_ADMIN, 'GET', '/meals/');

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(mealsSample.length);
    expect(data).toContainEqual(expect.objectContaining(mealsSample[0]));
  });

  it('lists own for regular user', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/');

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(mealsSample.length);
    expect(data).toContainEqual(expect.objectContaining(mealsSample[0]));
  });

  it('prohibits for guest', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'GET', '/meals/');

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Must be regular user or admin',
    });
  });

  it('prohibits for manager', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_BOB_MANAGER, 'GET', '/meals/');

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Must be regular user or admin',
    });
  });
});
