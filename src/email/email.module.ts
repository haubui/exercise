import { Module } from '@nestjs/common';
import { EmailSendgridService } from './email.service';

@Module({
  providers: [EmailSendgridService],
  exports: [EmailSendgridService],
})
export class EmailModule {}
