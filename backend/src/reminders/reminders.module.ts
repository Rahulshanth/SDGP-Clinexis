// All by Vidu  Updated on 2026/03/10
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { ReminderScheduler } from './reminder.scheduler';
import { Reminder, ReminderSchema } from './schemas/reminder.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Reminder.name, schema: ReminderSchema },
    ]),
  ],
  controllers: [RemindersController],
  providers: [RemindersService, ReminderScheduler],
  exports: [RemindersService],
})
export class RemindersModule {}
