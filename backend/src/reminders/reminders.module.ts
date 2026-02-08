// ALL ADD by VIDU*
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { ReminderScheduler } from './reminder.scheduler';
import { Reminder, ReminderSchema } from './reminder.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Reminder.name, schema: ReminderSchema },
    ]),
  ],
  controllers: [RemindersController],
  providers: [RemindersService, ReminderScheduler],
})
export class RemindersModule {}
