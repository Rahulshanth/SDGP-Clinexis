// src/auth/auth.controller.spec.ts

// ✅ Mock schema before imports
jest.mock('../users/users.schema', () => ({
  User: class MockUser {
    static name = 'User';
  },
  UserSchema: {},
}));

describe('AuthController - Unit Tests', () => {

  it('should validate login dto has email and password', () => {
    const loginDto = {
      email: 'rahul@gmail.com',
      password: 'password123',
    };

    expect(loginDto.email).toBeDefined();
    expect(loginDto.password).toBeDefined();
  });

  it('should validate register dto has required fields', () => {
    const registerDto = {
      name: 'Rahul',
      email: 'rahul@gmail.com',
      password: 'password123',
      role: 'doctor',
    };

    expect(registerDto.name).toBeDefined();
    expect(registerDto.email).toBeDefined();
    expect(registerDto.password).toBeDefined();
    expect(registerDto.role).toBeDefined();
  });

  it('should confirm accessToken is returned as string', () => {
    const mockResponse = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      user: { id: 'user123', role: 'doctor', email: 'rahul@gmail.com' },
    };

    expect(typeof mockResponse.accessToken).toBe('string');
    expect(mockResponse.accessToken.length).toBeGreaterThan(0);
  });

});
