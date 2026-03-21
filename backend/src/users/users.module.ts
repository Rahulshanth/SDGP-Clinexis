import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose'; // added by Rahul
import { User, UserSchema } from './users.schema'; // added by Rahul
import { UsersController } from './users.controller'; // added by Vidu

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], // added by Rahul
  controllers: [UsersController], // added by Vidu
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
