<<<<<<< HEAD
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument= User & Document;

@Schema()
export class User {
    @Prop ({required:true})
    name:string;
    @Prop({ required:true, unique:true})
    email:string;
    @Prop ({required:true})
    password:string;
    @Prop ({enum:['doctor', 'patient'], required: true})
    role:string;
}
export const UserSchema= SchemaFactory.createForClass(User);
=======
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './enums/user-role.enum';

export type UserDocument = User & Document;

/*export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  PHARMACY = 'pharmacy',
}*/  // Create user-role.enums file for enum UserRole (Modified 19th feb)

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole , default: UserRole.PATIENT, })
  role: UserRole;

  @Prop({ type: Object })
  profile: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
// everything added by Rahul
>>>>>>> develop
