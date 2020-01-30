import {
  extendedWithCreatedUpdated,
  internalRequest,
  JWT_ALICE_ADMIN, JWT_BOB_MANAGER,
  JWT_CAROL_REGULAR_USER,
  JWT_GUEST,
} from '../../.tests/apiFramework';
import { resetDatabase } from '../../backend/model/resetDatabase';
import {
  aliceAdminUserSample,
  danRegularUserSample,
  usersSample,
} from '../qa/samples/User.samples';
import { ListDto } from '../dto/ListDto';
import { User } from '../model/User.model';

beforeEach(async () => {
  await resetDatabase();
});

describe('/users/', () => {

  // ##### Positive ####

  it('lists all for admin', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_ALICE_ADMIN, 'GET', '/users/');

    // Assert
    expect(status).toBe(200);
    const { items }: ListDto<User> = data;
    expect(items.length).toBe(usersSample.length);
    expect(items).toContainEqual(expect.objectContaining(usersSample[0]));
  });

  it('lists all for manager', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_BOB_MANAGER, 'GET', '/users/');

    // Assert
    expect(status).toBe(200);
    const { items }: ListDto<User> = data;
    expect(items.length).toBe(usersSample.length);
    expect(items).toContainEqual(expect.objectContaining(usersSample[0]));
  });

  it('lists page 0', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_BOB_MANAGER, 'GET', '/users/?pageSize=3');

    // Assert
    expect(status).toBe(200);
    const { items, pagination }: ListDto<User> = data;
    expect(pagination).toEqual({
      page: 0,
      pageSize: 3,
      totalSize: 4,
    });
    expect(items.length).toBe(3);
    expect(items).toContainEqual(expect.objectContaining(danRegularUserSample));
  });

  it('lists page 1', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_BOB_MANAGER, 'GET', '/users/?pageSize=3&page=1');

    // Assert
    expect(status).toBe(200);
    const { items, pagination }: ListDto<User> = data;
    expect(pagination).toEqual({
      page: 1,
      pageSize: 3,
      totalSize: 4,
    });
    expect(items.length).toBe(1);
    expect(items).toContainEqual(expect.objectContaining(aliceAdminUserSample));
  });


  // ##### Negative ####

  it('prohibits for guest', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'GET', '/users/');

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Must be manager or admin',
    });
  });

  it('prohibits for regular user', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_CAROL_REGULAR_USER, 'GET', '/users/');

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Must be manager or admin',
    });
  });
});


describe('POST /users/', () => {

  // ##### Positive ####

  it('creates for admin', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_ALICE_ADMIN, 'POST', '/users/', {
      ...aliceAdminUserSample,
      email: 'new@example.com',
      password: '123',
      id: undefined,
      unexistent: 'the value', // Ensure it ignores unexistent fields
    });

    // Assert
    expect(status).toBe(200);
    expect(data).toEqual({
      ...extendedWithCreatedUpdated(aliceAdminUserSample),
      email: 'new@example.com',
      id: expect.anything(),
    });
  });

  it('creates for the manager', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_BOB_MANAGER, 'POST', '/users/', {
      ...aliceAdminUserSample,
      email: 'new@example.com',
      password: '123',
      id: undefined,
    });

    // Assert
    expect(status).toBe(200);
    expect(data).toEqual({
      ...extendedWithCreatedUpdated(aliceAdminUserSample),
      email: 'new@example.com',
      id: expect.anything(),
    });
  });


  // ##### Negative ####

  it('prohibits for guest', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/users/', {
      ...aliceAdminUserSample,
      email: 'new@example.com',
      id: undefined,
    });

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Must be manager or admin',
    });
  });

  it('fails with lack of fields', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_ALICE_ADMIN, 'POST', '/users/', {
      firstName: aliceAdminUserSample.firstName,
    });

    // Assert
    expect(status).toBe(400);
    expect(data).toEqual({
      error: 'VALIDATION_FAILED',
      message: 'Validation Error',
      errors: {
        email: 'User.email cannot be null',
        lastName: 'User.lastName cannot be null',
        password: 'User.password cannot be null',
      },
    });
  });
});
