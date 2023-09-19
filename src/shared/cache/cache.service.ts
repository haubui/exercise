import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HashUtils } from 'src/api/auth/hash.util';
import { TokenPayload } from 'src/api/auth/token.payload';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async saveToken(token: string, payload: TokenPayload): Promise<void> {
    const keySaved = await HashUtils.hashBM(token);
    await this.cacheManager.set(keySaved, payload);
  }

  async getPayloadFromTokenInCache(
    tokenFromRequest: string,
  ): Promise<TokenPayload> {
    const keySaved = await HashUtils.hashBM(tokenFromRequest);
    return await this.cacheManager.get(keySaved);
  }

  async deleteCacheTokenAfterLogout(token: string) {
    const keySaved = await HashUtils.hashBM(token);
    await this.cacheManager.del(keySaved);
  }

  async clearAllCache() {
    await this.cacheManager.reset();
  }
}
