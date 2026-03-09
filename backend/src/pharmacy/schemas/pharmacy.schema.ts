// Import decorators and helpers from NestJS mongoose package
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Import Document type from mongoose
import { Document } from 'mongoose';

/*
This creates a type that represents a Pharmacy document in MongoDB.
It combines the Pharmacy class with the Mongoose Document properties.
*/
export type PharmacyDocument = Pharmacy & Document;


/*
This schema represents a single medicine item in the pharmacy stock.
Each pharmacy can have multiple medicines.
*/
@Schema()
export class StockItem {

  // Name of the medicine
  @Prop({ required: true })
  medicineName: string;

  // How many units of the medicine are available
  @Prop({ required: true })
  quantity: number;

  // Price of the medicine
  @Prop({ required: true })
  price: number;

}

/*
Create a Mongoose schema from the StockItem class
This allows MongoDB to store stock items as embedded documents
*/
export const StockItemSchema = SchemaFactory.createForClass(StockItem);


/*
Main Pharmacy schema
This represents a pharmacy in the system
*/
@Schema({ timestamps: true }) // automatically adds createdAt and updatedAt
export class Pharmacy {

  // Pharmacy name
  @Prop({ required: true })
  name: string;

  // Pharmacy address
  @Prop()
  address: string;

  // Pharmacy phone number
  @Prop()
  phone: string;

  /*
  Stock array containing multiple medicines.
  Each medicine follows the StockItem schema.
  Default value is an empty array.
  */
  @Prop({ type: [StockItemSchema], default: [] })
  stock: StockItem[];

}

/*
Convert the Pharmacy class into a Mongoose schema
so it can be used by MongoDB.
*/
export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);