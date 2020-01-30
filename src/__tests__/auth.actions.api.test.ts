import { extendedWithCreatedUpdated, internalRequest, JWT_GUEST } from '../../.tests/apiFramework';
import { resetDatabase } from '../../backend/model/resetDatabase';
import { carolRegularUserSample, usersSamplePassword } from '../qa/samples/User.samples';

beforeEach(async () => {
  await resetDatabase();
});

describe('/auth/login/', () => {

  it('logins', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/auth/login/', {
      email: carolRegularUserSample.email,
      password: usersSamplePassword,
    });

    // Assert
    expect(status).toBe(200);
    expect(data).toEqual({
      token: expect.stringMatching(/.+/),
      user: extendedWithCreatedUpdated(carolRegularUserSample),
    });
  });

  it('fails with empty input', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/auth/login/', {
    });

    // Assert
    expect(status).toBe(400);
    expect(data).toEqual({
      error: 'VALIDATION_FAILED',
      message: 'Validation Error',
      errors: {
        email: 'AuthLoginDto.email cannot be null',
        password: 'AuthLoginDto.password cannot be null',
      },
    });
  });

  it('fails with empty fields', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/auth/login/', {
      email: '',
      password: '',
    });

    // Assert
    expect(status).toBe(400);
    expect(data).toEqual({
      error: 'VALIDATION_FAILED',
      message: 'Validation Error',
      errors: {
        email: 'Validation notEmpty on email failed',
        password: 'Validation notEmpty on password failed',
      },
    });
  });

  it('rejects with wrong email', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/auth/login/', {
      email: carolRegularUserSample.email,
      password: 'invalid password',
    });

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Email or password do not match',
    });
  });

  it('rejects with wrong password', async () => {
    // Arrange
    // Act
    const { status, data } = await internalRequest(JWT_GUEST, 'POST', '/auth/login/', {
      email: 'nonexistent@example.com',
      password: usersSamplePassword,
    });

    // Assert
    expect(status).toBe(403);
    expect(data).toEqual({
      error: 'FORBIDDEN',
      message: 'Email or password do not match',
    });
  });
});
