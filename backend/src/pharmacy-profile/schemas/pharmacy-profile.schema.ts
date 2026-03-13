import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PharmacyProfileDocument = PharmacyProfile & Document;

@Schema({ timestamps: true })
export class PharmacyProfile {
  @Prop({ type: Types.ObjectId, ref: 'Pharmacy', required: true })
  pharmacy: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  operatingHours: string;

  @Prop([String])
  services: string[];

  @Prop()
  licenseNumber: string;

  @Prop()
  rating: number;

  @Prop()
  totalReviews: number;
}

export const PharmacyProfileSchema =
  SchemaFactory.createForClass(PharmacyProfile);
