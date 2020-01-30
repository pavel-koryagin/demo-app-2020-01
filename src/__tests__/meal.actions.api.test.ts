import qs from 'querystring';
import {
  internalRequest,
  JWT_ALICE_ADMIN, JWT_BOB_MANAGER,
  JWT_CAROL_REGULAR_USER,
  JWT_GUEST,
} from '../../.tests/apiFramework';
import { resetDatabase } from '../../backend/model/resetDatabase';
import {
  mealsSample, todayLunchMealSample, yesterdayBreakfastMealSample,
  yesterdayDinnerMealSample,
  yesterdayLunchMealSample,
} from '../qa/samples/Meal.samples';

beforeEach(async () => {
  await resetDatabase();
});

describe('/meals/', () => {

  // ##### Positive ####

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
    expect(data.length).toBe(5);
    expect(data).toContainEqual(expect.objectContaining(mealsSample[0]));
  });

  it('lists page 0 for regular user', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/?pageSize=3');

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(3);
    expect(data).toContainEqual(expect.objectContaining(todayLunchMealSample));
  });

  it('lists page 1 for regular user', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/?pageSize=3&page=1');

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    expect(data).toContainEqual(expect.objectContaining(yesterdayBreakfastMealSample));
  });

  it('applies filter by date and time', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/?' + qs.encode({
      dateStart: yesterdayLunchMealSample.date,
      dateEnd: yesterdayLunchMealSample.date,
      timeStart: yesterdayLunchMealSample.time,
      timeEnd: yesterdayDinnerMealSample.time,
    }));

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    expect(data).toContainEqual(expect.objectContaining(yesterdayLunchMealSample));
    expect(data).toContainEqual(expect.objectContaining(yesterdayDinnerMealSample));
  });

  it('applies filter by time only', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/?' + qs.encode({
      timeStart: todayLunchMealSample.time,
      timeEnd: yesterdayDinnerMealSample.time,
    }));

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(3);
    expect(data).toContainEqual(expect.objectContaining(yesterdayLunchMealSample));
    expect(data).toContainEqual(expect.objectContaining(yesterdayDinnerMealSample));
    expect(data).toContainEqual(expect.objectContaining(todayLunchMealSample));
  });

  it('applies filter by partial range', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/meals/?' + qs.encode({
      dateEnd: yesterdayLunchMealSample.date,
      timeEnd: yesterdayLunchMealSample.time,
    }));

    // Assert
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    expect(data).toContainEqual(expect.objectContaining(yesterdayBreakfastMealSample));
    expect(data).toContainEqual(expect.objectContaining(yesterdayLunchMealSample));
  });


  // ##### Negative ####

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
