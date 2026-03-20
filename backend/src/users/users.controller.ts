// backend/src/users/users.controller.ts — Created by Vidu
import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/me — get logged in doctor/patient profile
  @Get('me')
  @Roles(UserRole.DOCTOR, UserRole.PATIENT)
  getMyProfile(@Request() req) {
    const userId = req.user.userId;
    return this.usersService.getProfile(userId);
  }

  // GET /users/:id — get any doctor profile by ID
  // ← Vidu added for patient viewing doctor profile
  @Get(':id')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  getProfileById(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  // PATCH /users/me — update logged in doctor/patient profile
  @Patch('me')
  @Roles(UserRole.DOCTOR, UserRole.PATIENT)
  updateMyProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    const userId = req.user.userId;
    return this.usersService.updateProfile(userId, dto);
  }
}
