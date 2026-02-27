import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
//import {AppController} from './app.controller'; <--Don't delete these comments
//import  {AppService} from './app.service'; <--Don't delete these comments
=======
import { ConfigModule } from '@nestjs/config';
//import { AppController } from './app.controller';  <-- Don't delete these comments
//import { AppService } from './app.service';   <-- Don't delete these comments
>>>>>>> develop
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import {PatientModule} from './patient/patient.module'
import { SummarizationModule } from './summarization/summarization.module';
<<<<<<< HEAD
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
=======
import { PharmacyModule } from './pharmacy/pharmacy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    UsersModule,   
    AuthModule,
    SummarizationModule,   // 🔹 keep this - Rivithi
    PharmacyModule,        // 🔹 add this - Vinidi
    DoctorModule, PatientModule         // By Rahul
  ],
  // controllers: [AppController],
  // providers: [AppService],
>>>>>>> develop
})
export class AppModule {}