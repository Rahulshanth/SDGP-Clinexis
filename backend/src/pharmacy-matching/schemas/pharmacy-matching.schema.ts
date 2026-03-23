import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PharmacyMatchingDocument = PharmacyMatching & Document;

@Schema({ timestamps: true })
export class PharmacyMatching {
  @Prop({ type: Types.ObjectId, ref: 'Prescription', required: true })
  prescription: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PharmacyProfile', required: true })
  pharmacy: Types.ObjectId;

  @Prop({ required: true })
  medicine: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  distance: number;

  @Prop()
  matchScore: number;

  @Prop({
    enum: ['available', 'out_of_stock', 'discontinued'],
    default: 'available',
  })
  status: string;

  @Prop()
  estimatedDeliveryTime: number; // in hours

  @Prop({ default: false })
  isMatched: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  matchedBy: Types.ObjectId;

  @Prop()
  notes: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const PharmacyMatchingSchema =
  SchemaFactory.createForClass(PharmacyMatching);
