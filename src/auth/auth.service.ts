import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { HashUtils } from './hash.util';
import { LoginResponseDto } from './dto/login.response.dto';
import { ResponseUtils } from 'src/base/response.utils';
import { InjectModel } from '@nestjs/sequelize';
import { Auths } from 'src/models/auth.model';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cacheService: CacheService,
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
    const payload = {
      user_id: user.id,
      user_email: email,
      user_role: user.mappingRoleIdToRole(),
    };
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

  async invalidTokenFamily(user_id: number) {
    const allTokenOfUser = await this.authModel.findAll({
      where: { user_id: user_id },
    });
    allTokenOfUser.forEach((token) => {
      token.is_valid = false;
      token.save();
    });
  }

  async saveUserToken(user_id: number, user_token: string) {
    const tokenHashed = await HashUtils.hashBM(user_token);
    const auths = new Auths();
    auths.user_id = user_id;
    auths.user_token = tokenHashed;
    auths.createdAt = new Date();
    auths.updatedAt = new Date();
    auths.is_valid = true;
    await auths.save();
  }

  async logOut(token: string) {
    console.log('logOut', token);
    if (token) {
      const tokenHasedBM = await HashUtils.hashBM(token);
      const userHaveToken = await this.authModel.findOne({
        where: { user_token: tokenHasedBM },
      });
      if (!userHaveToken) {
        throw ResponseUtils.throwErrorException(HttpStatus.NOT_FOUND, {
          message: 'User is not found',
        });
      }
      console.log('userHaveToken', userHaveToken);
      await this.invalidTokenFamily(userHaveToken.user_id);
      await this.cacheService.deleteCacheTokenAfterLogout(token);
    } else {
      throw ResponseUtils.throwErrorException(HttpStatus.FORBIDDEN);
    }
  }

  async didUserLogoutThisToken(token: string): Promise<boolean> {
    console.log('didUserLogoutThisToken origin ', token);
    const tokenHashed = await HashUtils.hashBM(token);
    const tokenHashedSecondTime = await HashUtils.hashBM(token);
    console.log('didUserLogoutThisToken', tokenHashed);
    console.log(
      'didUserLogoutThisToken tokenHashedSecondTime ',
      tokenHashedSecondTime,
    );
    const userHaveToken = await this.authModel.findOne({
      where: { user_token: tokenHashed },
    });
    console.log('didUserLogoutThisToken userHaveToken ', userHaveToken);
    return userHaveToken.is_valid;
  }
}
