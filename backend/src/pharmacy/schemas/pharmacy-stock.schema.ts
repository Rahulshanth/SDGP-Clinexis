import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PharmacyStockDocument = PharmacyStock & Document;

@Schema({ timestamps: true })
export class PharmacyStock {

  @Prop({ type: Types.ObjectId, ref: 'Pharmacy', required: true })
  pharmacy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Medicine', required: true })
  medicine: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const PharmacyStockSchema = SchemaFactory.createForClass(PharmacyStock);