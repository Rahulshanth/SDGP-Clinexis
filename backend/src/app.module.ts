import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
//import { AppController } from './app.controller';  <-- Don't delete these comments
//import { AppService } from './app.service';   <-- Don't delete these comments
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import {PatientModule} from './patient/patient.module'
import { SummarizationModule } from './summarization/summarization.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI'),
  }),      //Added by Nadithi on 25th Feb
}),

    UsersModule,   
    AuthModule,
    SummarizationModule,   // 🔹 keep this - Rivithi
    PharmacyModule,        // 🔹 add this - Vinidi
    DoctorModule, PatientModule         // By Rahul
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
console.log('MONGO_URI:', process.env.MONGO_URI); //Added by Nadithi