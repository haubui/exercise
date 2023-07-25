import { IsNumberString } from 'class-validator';

export class GetAllUserParam {
  @IsNumberString()
  userId: number;
}
