import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
//import {AppController} from './app.controller'; <--Don't delete these comments
//import  {AppService} from './app.service'; <--Don't delete these comments
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { PatientModule } from './patient/patient.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { SummarizationModule } from './summarization/summarization.module';
import { ConsultationsModule } from './consultations/consultations.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),// Added by Nadithi
    
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    
    
    UsersModule,
    AuthModule,
    DoctorModule,PatientModule, //by rahul
    PharmacyModule,  //by vinidi
    SummarizationModule, //keep this - rivithi
  ],
  //controllers: [AppController], <--Don't delete these comments
  //providers: [AppService], <--Don't delete these comments
})
export class AppModule {}
