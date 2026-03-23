import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class PatientService {
  constructor(private usersService: UsersService) {}

  async searchDoctors(specialization: string) {
    return this.usersService.findBySpecialization(specialization);
  }

  async searchDoctorsByName(name: string) {
  return this.usersService.findByName(name);
}

}

// Created by Rahul