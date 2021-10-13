import { Module } from '@nestjs/common';
import { ScheduledMessageService } from './scheduled-message.service';
import { ScheduledMessageController } from './scheduled-message.controller';

@Module({
  providers: [ScheduledMessageService],
  controllers: [ScheduledMessageController]
})
export class ScheduledMessageModule {}
