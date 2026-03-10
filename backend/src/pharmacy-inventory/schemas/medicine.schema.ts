// Import decorators to define a MongoDB schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Import mongoose Document type
import { Document } from 'mongoose';

// Define the document type for TypeScript
export type MedicineDocument = Medicine & Document;

// Define the schema with automatic createdAt and updatedAt timestamps
@Schema({ timestamps: true })
export class Medicine {

  // Medicine name (example: Paracetamol)
  @Prop({ required: true })
  name: string;

  // ID of the pharmacy that owns this medicine stock
  @Prop({ required: true })
  pharmacyId: string;

  // Quantity of the medicine available in stock
  @Prop({ required: true })
  quantity: number;

  // Price of the medicine (optional field)
  @Prop()
  price: number;
}

// Create the schema from the class definition
export const MedicineSchema = SchemaFactory.createForClass(Medicine);