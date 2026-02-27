import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';  <-- Don't delete these comments
// import { AppService } from './app.service';        <-- Don't delete these comments
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctor.module';
import { SummarizationModule } from './summarization/summarization.module';
import { PharmacyProfileModule } from './pharmacy/pharmacy-profile/pharmacy-profile.module';
import { PharmacyMatchingModule } from './pharmacy-matching/pharmacy-matching.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    UsersModule,
    AuthModule,
    PharmacyProfileModule,
    PharmacyMatchingModule,
    SummarizationModule,// 🔹 keep this - Rivithi
    DoctorModule,

  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }