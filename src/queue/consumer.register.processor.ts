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
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process(REGISTER_USER_QUEUE_PROCESS)
  async registerUser(job: Job) {
    console.log(`Email REGISTER_USER_QUEUE_PROCESS data to ${job.data}`);
    const { userName, email } = job.data;
    const mail = {
      to: [email],
      subject: 'Congratulations!',
      from: process.env.ADMIN_EMAIL,
      text: 'Dear ' + userName + ',\n',
      html: `<h1>Congratulations on successfully registering your account!</h1>\n
      <p>Best Regards,\nCar Rental System Admin.</p>
      `,
    };
    this.sendgridService.send(mail);
    console.log(`Email successfully dispatched to ${mail.to}`);
  }
}
