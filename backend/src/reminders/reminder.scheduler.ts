// All by Vidu  Updated on 2026/03/10
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RemindersService } from './reminders.service';

@Injectable()
export class ReminderScheduler {
  private readonly logger = new Logger(ReminderScheduler.name);

  constructor(private readonly remindersService: RemindersService) {}

  @Cron('0 * * * * *') // every 60 seconds
  async handleReminderCheck() {
    this.logger.log('Checking for pending reminders...');
    const pending = await this.remindersService.getPendingReminders();

    for (const reminder of pending) {
      this.logger.log(
        `Reminder due for patient ${reminder.patientId}: ${reminder.message}`,
      );
      await this.remindersService.markAsSent((reminder as any)._id.toString());
      // TODO Phase 4: OneSignal push notification goes here
    }
  }
}
