import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { HashUtils } from './hash.util';
import { LoginResponseDto } from './dto/login.response.dto';
import { ResponseUtils } from 'src/base/response.utils';
import { InjectModel } from '@nestjs/sequelize';
import { Auths } from 'src/models/auth.model';
import { where } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Auths)
    private authModel: typeof Auths,
  ) {}

  async signIn(email, pass): Promise<LoginResponseDto> {
    const adminPassword = await HashUtils.hash(pass);
    console.log('from the request', email, pass);
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
        code: HttpStatus.NOT_FOUND,
        message: 'User email or pass not correct!',
      });
    }
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
    console.log(accessToken.length);
    loginResponseDto.access_token = accessToken;
    await this.invalidTokenFamily(user.id);
    await this.saveUserToken(user.id, accessToken);
    return loginResponseDto;
  }

  async invalidTokenFamily(userId: number) {
    const allTokenOfUser = await this.authModel.findAll({
      where: { user_id: userId },
    });
    allTokenOfUser.forEach((token) => {
      token.is_valid = false;
      token.save();
    });
  }

  async saveUserToken(user_id: number, user_token: string) {
    const auths = new Auths();
    auths.user_id = user_id;
    auths.user_token = user_token;
    auths.createdAt = new Date();
    auths.updatedAt = new Date();
    auths.is_valid = true;
    await auths.save();
  }
}
