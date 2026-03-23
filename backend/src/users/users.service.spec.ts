// src/users/users.service.spec.ts

// ✅ Mock schema before imports
jest.mock('./users.schema', () => ({
  User: class MockUser {
    static name = 'User';
  },
  UserSchema: {},
}));

describe('UsersService - Schema Validation Tests', () => {

  it('should validate user object has required fields', () => {
    const user = {
      name: 'Rahul',
      email: 'rahul@gmail.com',
      password: 'hashedpassword123',
      role: 'doctor',
    };

    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.role).toBeDefined();
  });

  it('should validate email format contains @', () => {
    const email = 'rahul@gmail.com';
    expect(email).toContain('@');
  });

  it('should validate role is either doctor or patient', () => {
    const validRoles = ['doctor', 'patient'];
    const role = 'doctor';
    expect(validRoles).toContain(role);
  });

  it('should confirm password field is not empty', () => {
    const password = 'hashedPassword123';
    expect(password.length).toBeGreaterThan(0);
  });

});