import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { HashUtils } from './hash.util';
import { LoginResponseDto } from './dto/login.response.dto';
import { ResponseUtils } from 'src/base/response.utils';
import { Error } from 'src/base/error.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass): Promise<LoginResponseDto> {
    const adminPassword = await HashUtils.hash(pass);
    console.log('from the request', email, pass);
    const user = await this.usersService.findOneByEmail(email);
    console.log('from the db user', user.email, user.password);
    console.log(adminPassword);
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(isMatch);
    if (!isMatch && email == user.email) {
      throw ResponseUtils.throwErrorException(HttpStatus.UNAUTHORIZED, {
        code: HttpStatus.UNAUTHORIZED,
        message: 'User email or pass not correct!',
      });
    }
    const payload = { sub: user.id, user: user };
    const loginResponseDto = new LoginResponseDto();
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    loginResponseDto.access_token = accessToken;
    return loginResponseDto;
  }
}
