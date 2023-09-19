import { Request } from 'express';

export class GuardUtils {
  static extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
