import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HashUtils } from 'src/auth/hash.util';
import { TokenPayload } from 'src/auth/token.payload';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async saveToken(token: string, payload: TokenPayload): Promise<void> {
    await this.cacheManager.set(token, payload);
  }

  async getPayloadFromTokenInCache(
    tokenFromRequest: string,
  ): Promise<TokenPayload> {
    return await this.cacheManager.get(tokenFromRequest);
  }

  async deleteCacheTokenAfterLogout(token: string) {
    await this.cacheManager.del(token);
  }

  async clearAllCache() {
    await this.cacheManager.reset();
  }
}
