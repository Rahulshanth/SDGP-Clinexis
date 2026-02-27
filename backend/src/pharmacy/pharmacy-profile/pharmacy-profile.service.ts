import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyProfileService {
  private profiles: any[] = [];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find(profile => profile.id === id);
  }

  create(createProfileDto: any) {
    const newProfile = {
      id: Date.now().toString(),
      ...createProfileDto,
      createdAt: new Date(),
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  update(id: string, updateProfileDto: any) {
    const index = this.profiles.findIndex(profile => profile.id === id);
    if (index !== -1) {
      this.profiles[index] = {
        ...this.profiles[index],
        ...updateProfileDto,
        updatedAt: new Date(),
      };
      return this.profiles[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.profiles.findIndex(profile => profile.id === id);
    if (index !== -1) {
      const removed = this.profiles.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}