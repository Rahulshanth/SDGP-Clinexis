import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; //added by Rahul
import { Model } from 'mongoose'; //added by Rahul
import { User, UserDocument } from './users.schema'; //added by Rahul

@Injectable()
//added by Rahul
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: Partial<User>) {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  //upto this line
}
