import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
=======
import { MongooseModule } from '@nestjs/mongoose'; // added by Rahul
import { User, UserSchema } from './users.schema'; // added by Rahul


@Module({
    imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], // added by Rahul
  providers: [UsersService],
  exports: [UsersService],
>>>>>>> develop
})
export class UsersModule {}
