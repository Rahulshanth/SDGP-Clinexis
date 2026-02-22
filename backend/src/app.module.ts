import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { PatientModule } from './patient/patient.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { SummarizationModule } from './summarization/summarization.module';
import { DatabaseModule } from './database/database.module';
import { ConsultationsModule } from './consultations/consultations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
    PharmacyModule,
    SummarizationModule,
    DatabaseModule,
    ConsultationsModule,
  ],
})
export class AppModule {}
