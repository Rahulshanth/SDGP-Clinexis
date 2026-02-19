import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
//import { AppController } from './app.controller';  <-- Don't delete these comments
//import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { SummarizationModule } from './summarization/summarization.module';
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
    DoctorModule,          // By Rahul
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}