import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RemindersModule } from './reminders/reminders.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
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
    SummarizationModule, // 🔹 keep this
    PharmacyModule, // 🔹 add this
    RemindersModule, //  Add this locally(for now)
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
