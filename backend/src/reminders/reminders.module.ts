// ALL ADD by VIDU* code updated on 2026/03/03

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { ReminderScheduler } from './reminder.scheduler';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Enables cron scheduler
  ],
  controllers: [RemindersController],
  providers: [RemindersService, ReminderScheduler],
})
export class RemindersModule {}
