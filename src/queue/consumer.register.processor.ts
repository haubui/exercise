import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  REGISTER_USER_QUEUE_PROCESS,
  REGISTER_USER_QUEUE_PROCESSOR,
} from 'src/constants/constants';
import { EmailSendgridService } from 'src/email/email.service';
import { UserDto } from 'src/users/dto/user.dto';

@Processor(REGISTER_USER_QUEUE_PROCESSOR)
export class ComsumerRegisterProcessor {
  constructor(private readonly sendgridService: EmailSendgridService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job id ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process(REGISTER_USER_QUEUE_PROCESS)
  async registerUser(job: Job<UserDto>) {
    const userDto = job.data;
    const mail = {
      to: [userDto.email],
      subject: 'Congratulations! - From Car Rental System',
      from: process.env.ADMIN_EMAIL,
      text: 'Dear ' + userDto.user_name + ',\n',
      html: `<h1>Congratulations on successfully registering your Car Rental System account!</h1>\n
      <h2>Best Regards,</h2>
      <h2>Car Rental System Admin.</h2>
      `,
    };
    this.sendgridService.send(mail);
    console.log(`Email successfully dispatched to ${mail.to}`);
  }
}
