import { Decode } from '@app/types/decode.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserService } from '@app/user/user.service';
import { ExpressRequest } from '@app/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

    try {
      const decode: string | Decode = verify(token, JWT_SECRET);
      if (typeof decode !== 'string' && decode.id) {
        const user = await this.userService.findById(decode.id);
        req.user = user;
        next();
      }
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
