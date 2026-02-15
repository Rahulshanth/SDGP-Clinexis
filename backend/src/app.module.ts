//vinidi Register Module
import { PharmacyModule } from './pharmacy/pharmacy.module';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SummarizationModule } from './summarization/summarization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI as string),

    UsersModule,
    AuthModule,
    PharmacyModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})


export class AppModule {}