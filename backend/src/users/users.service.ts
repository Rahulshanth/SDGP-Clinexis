// backend/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // ── Rahul's original methods — unchanged ──────────────────────────────────
  async createUser(data: Partial<User>) {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findBySpecialization(specialization: string) {
    return this.userModel.find({
      role: 'doctor',
      'profile.specialization': { $regex: specialization, $options: 'i' },
    });
  }

  // ── New methods added by Vidu ─────────────────────────────────────────────

  // GET profile by userId
  async getProfile(userId: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(userId)
      .select('-password') // ← never send password to frontend
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // PATCH profile by userId
  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: {
            'profile.name': dto.name,
            'profile.specialization': dto.specialization,
            'profile.hospitalName': dto.hospitalName,
            'profile.phoneNumber': dto.phoneNumber,
            'profile.clinicLocation': dto.clinicLocation,
            'profile.profilePhoto': dto.profilePhoto,
          },
        },
        { new: true }, // ← return updated document
      )
      .select('-password')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Search doctors by name — added for VoiceRecorder screen
async findByName(name: string) {
  return this.userModel.find({
    role: 'doctor',
    'profile.name': { $regex: name, $options: 'i' },
  }).select('-password');
}

}
