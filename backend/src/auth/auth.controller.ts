/*import { Controller } from '@nestjs/common';*/

// These are codes already existed.

// From here to
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    console.log('Register endpoint received:', JSON.stringify(dto));
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    console.log('Login endpoint received:', dto.email);
    return this.authService.login(dto);
  }
}

// here written and pasted by Rahul
