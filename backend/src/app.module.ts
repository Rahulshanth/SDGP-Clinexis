import { Module } from '@nestjs/common';
import { NlpModule } from './nlp/nlp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // load .env file
    MongooseModule.forRoot(process.env.MONGO_URI!), // connect MongoDB
    AuthModule,
    NlpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}