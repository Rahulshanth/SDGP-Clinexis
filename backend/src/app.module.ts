import { Module } from '@nestjs/common';
import { NlpModule } from './nlp/nlp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RemindersModule } from './reminders/reminders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { PatientModule } from './patient/patient.module';
import { SummarizationModule } from './summarization/summarization.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { ConsultationsModule } from './consultations/consultations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    UsersModule,
    AuthModule,
    SummarizationModule, // 🔹 keep this - Rivithi
    PharmacyModule, // 🔹 add this - Vinidi
    DoctorModule,
    PatientModule,
    ConsultationsModule, // By Rahul
    RemindersModule, // 🔹 add this - Vidu
    NlpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
