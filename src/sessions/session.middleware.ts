import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const sessionMiddleware = session({
      name: 'residents.sid',
      secret: process.env.SESSION_SECRET,
      resave: false, 
      saveUninitialized: false, 
      cookie: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // HTTPS только в production
        maxAge: 7200, 
        sameSite: 'lax',
      },
    });

    sessionMiddleware(req, res, next);
  }
}