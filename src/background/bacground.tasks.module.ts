import { Module } from '@nestjs/common';
import { TasksService } from './background.tasks';

@Module({
  providers: [TasksService],
})
export class TasksModule {}
