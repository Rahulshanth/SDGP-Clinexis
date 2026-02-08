// ALL ADD by VIDU*
import { Controller, Post, Body, Get } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() body: any): any {
    return this.remindersService.createReminder(body);
  }

  @Get('pending')
  getPending(): any {
    return this.remindersService.getPendingReminders();
  }
}
