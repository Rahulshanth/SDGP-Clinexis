import { Injectable, Logger } from '@nestjs/common'; //ALL ADD by VIDU
import { Cron } from '@nestjs/schedule';
import { RemindersService } from './reminders.service';

@Injectable()
export class ReminderScheduler {
  private readonly logger = new Logger(ReminderScheduler.name);

  constructor(private readonly remindersService: RemindersService) {}

  @Cron('* * * * *') // every minute
  handleReminderCheck() {
    this.logger.log('Checking for pending reminders...');

    const pending = this.remindersService.getPendingReminders();

    pending.forEach((reminder) => {
      this.logger.log(
        `Sending reminder to ${reminder.patientId}: ${reminder.message}`,
      );
      this.remindersService.markAsSent(reminder);
    });
  }
}
