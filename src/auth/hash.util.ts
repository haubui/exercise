import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/constants/constants';
export class HashUtils {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }
}
