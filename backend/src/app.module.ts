import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { SummarizationModule } from './summarization/summarization.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { PatientModule } from './patient/patient.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { PharmacyInventoryModule } from './pharmacy-inventory/pharmacy-inventory.module';

import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    UsersModule,
    AuthModule,
    PharmacyModule,
    SummarizationModule, // 🔹 keep this - Rivithi
    DoctorModule,
    PatientModule,
    PharmacyInventoryModule,
    ConsultationsModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
