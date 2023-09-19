import { JwtModuleOptions } from '@nestjs/jwt';
import { EXPIRE_IN_JWT } from '../constants/constants';

// eslint-disable-next-line
require('dotenv').config();
export const jwtModuleOptions: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: EXPIRE_IN_JWT },
};
