import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron('*/5 * * * * *') // Runs every 5 seconds
  checkSomething() {
    // Perform your check logic here
    console.log('Checking system status, run every 5 seconds ...');
  }

  @Interval(20000) // Runs every 20 seconds
  deleteSomething() {
    // Perform your delete logic here
    console.log('Deleting un use data, Runs every 20 seconds ...');
  }

  @Timeout(60000) // Runs after 1 minute
  doSomethingOnce() {
    // Perform your one-time logic here
    console.log(
      'Doing initial for system once, Runs after 1 minute counting from started bootstrap...',
    );
  }
}
