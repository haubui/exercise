import { IsNumberString } from 'class-validator';

export class GetAllUserParam {
  @IsNumberString()
  user_id: number;
}
