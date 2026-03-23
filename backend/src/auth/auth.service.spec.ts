// src/auth/auth.service.spec.ts

// ✅ Mock the schema BEFORE any imports — stops the UserRole crash
jest.mock('../users/users.schema', () => ({
  User: class MockUser {
    static name = 'User';
  },
  UserSchema: {},
}));

import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// ---- MOCKS ----
const mockUsersService = {
  createUser: jest.fn(),
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

// ---- TEST SUITE ----
describe('AuthService - Unit Tests', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(
      mockUsersService as any,
      mockJwtService as any,
    );
    jest.clearAllMocks();
  });

  // -----------------------------------------------
  // REGISTER TESTS
  // -----------------------------------------------
  describe('register()', () => {

    it('should register a user and return success message', async () => {
      const dto = {
        name: 'Rahul',
        email: 'rahul@gmail.com',
        password: 'password123',
        role: 'doctor',
      };
      mockUsersService.createUser.mockResolvedValue(undefined);

      const result = await authService.register(dto as any);

      expect(result).toEqual({ message: 'User registered successfully' });
      expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
    });

    it('should hash the password before saving', async () => {
      const dto = {
        name: 'Rahul',
        email: 'rahul@gmail.com',
        password: 'plainPassword',
        role: 'doctor',
      };
      mockUsersService.createUser.mockResolvedValue(undefined);

      await authService.register(dto as any);

      const calledWithArgs = mockUsersService.createUser.mock.calls[0][0];

      // Password must be hashed — not plain text
      expect(calledWithArgs.password).not.toBe('plainPassword');
    });

    it('should call createUser exactly once per registration', async () => {
      const dto = {
        name: 'TestUser',
        email: 'test@gmail.com',
        password: 'test123',
        role: 'patient',
      };
      mockUsersService.createUser.mockResolvedValue(undefined);

      await authService.register(dto as any);

      expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
    });

  });

  // -----------------------------------------------
  // LOGIN TESTS
  // -----------------------------------------------
  describe('login()', () => {

    it('should return accessToken and user on valid credentials', async () => {
      const dto = { email: 'rahul@gmail.com', password: 'password123' };

      const fakeUser = {
        _id: 'user123',
        email: 'rahul@gmail.com',
        password: await bcrypt.hash('password123', 10),
        role: 'doctor',
      };

      mockUsersService.findByEmail.mockResolvedValue(fakeUser);
      mockJwtService.sign.mockReturnValue('fake-jwt-token');

      const result = await authService.login(dto);

      expect(result.accessToken).toBe('fake-jwt-token');
      expect(result.user.email).toBe('rahul@gmail.com');
      expect(result.user.role).toBe('doctor');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const dto = { email: 'unknown@gmail.com', password: 'password123' };

      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      const dto = { email: 'rahul@gmail.com', password: 'wrongPassword' };

      const fakeUser = {
        _id: 'user123',
        email: 'rahul@gmail.com',
        password: await bcrypt.hash('correctPassword', 10),
        role: 'doctor',
      };

      mockUsersService.findByEmail.mockResolvedValue(fakeUser);

      await expect(authService.login(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should include user id in returned user object', async () => {
      const dto = { email: 'rahul@gmail.com', password: 'password123' };

      const fakeUser = {
        _id: 'user123',
        email: 'rahul@gmail.com',
        password: await bcrypt.hash('password123', 10),
        role: 'doctor',
      };

      mockUsersService.findByEmail.mockResolvedValue(fakeUser);
      mockJwtService.sign.mockReturnValue('fake-jwt-token');

      const result = await authService.login(dto);

      expect(result.user.id).toBe('user123');
    });

  });

});