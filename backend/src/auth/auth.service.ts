import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';

// Written by Rahul
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    try {
      console.log('Register attempt with email:', dto.email);
      
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(dto.email);
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }

      const hashedPassword = (await bcrypt.hash(dto.password, 10)) as string;
      await this.usersService.createUser({
        ...dto,
        password: hashedPassword,
      });

      console.log('User registered successfully:', dto.email);
      return { message: 'User registered successfully' };
    } catch (error: any) {
      console.error('Registration error:', error);
      // Handle duplicate key error from MongoDB
      if (error.code === 11000) {
        throw new BadRequestException('Email already registered');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = (await bcrypt.compare(
      dto.password,
      user.password,
    )) as boolean;
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
         id: user._id, 
         role: user.role,
         email: user.email,
  },
    };
  }

  // Upto this
}
