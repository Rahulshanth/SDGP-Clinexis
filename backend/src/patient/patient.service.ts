import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PatientService {
  constructor(private usersService: UsersService) {}

  async searchDoctors(specialization: string) {
    return this.usersService.findBySpecialization(specialization);
  }
}

// Created by Rahul