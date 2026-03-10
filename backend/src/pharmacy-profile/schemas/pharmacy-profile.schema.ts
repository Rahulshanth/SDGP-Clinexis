// Import decorators to define MongoDB schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Import mongoose document and ObjectId type
import { Document, Types } from 'mongoose';

// Define document type for PharmacyProfile
export type PharmacyProfileDocument = PharmacyProfile & Document;

// Create schema with automatic createdAt and updatedAt timestamps
@Schema({ timestamps: true })
export class PharmacyProfile {

  // Reference to main Pharmacy collection
  @Prop({ type: Types.ObjectId, ref: 'Pharmacy', required: true })
  pharmacy: Types.ObjectId;

  // Pharmacy name
  @Prop({ required: true })
  name: string;

  // Pharmacy profile image (URL or file path)
  @Prop()
  profileImage: string;

  // Description about the pharmacy
  @Prop()
  description: string;

  // Pharmacy address
  @Prop()
  address: string;

  // Contact phone number
  @Prop()
  phone: string;

  // Email address
  @Prop()
  email: string;

  // Pharmacy website (optional)
  @Prop()
  website: string;

  // Latitude for location-based search
  @Prop()
  latitude: number;

  // Longitude for location-based search
  @Prop()
  longitude: number;

  // Whether pharmacy is active
  @Prop({ default: true })
  isActive: boolean;

  // Pharmacy operating hours
  @Prop()
  operatingHours: string;

  // Services provided by pharmacy
  @Prop([String])
  services: string[];

  // Pharmacy license number
  @Prop()
  licenseNumber: string;

  // Average rating from users
  @Prop()
  rating: number;

  // Total number of reviews
  @Prop()
  totalReviews: number;
}

// Create schema from class
export const PharmacyProfileSchema =
  SchemaFactory.createForClass(PharmacyProfile);