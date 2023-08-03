import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/constants/constants';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
export class HashUtils {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  static async hashBM(data: string): Promise<string> {
    return CryptoJS.MD5(Buffer.from(data).toString('base64')).toString();
  }
}
