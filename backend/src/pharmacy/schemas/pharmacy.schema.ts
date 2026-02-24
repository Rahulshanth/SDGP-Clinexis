import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PharmacyDocument = Pharmacy & Document;

@Schema({ timestamps: true })
export class Pharmacy {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);