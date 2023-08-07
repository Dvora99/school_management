import passport from 'passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/userModel';
import Token from '../models/tokenModel';
import { Request, Response, NextFunction } from 'express';
import errorType from '../utils/errorType';
import { appError } from '../utils/errorHelper';

config();

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true
}, async (req: Request, user: any, done: any) => {
  try {
    const { id } = user;
    const data = await User.findOne({
      where: { id },
      include: {
        model: Token
      },
    });
    return done(null, data);
  }
  catch (err) {
    return done(err, false);
  }
}));

const requireAuth = passport.authenticate('jwt', { session: false });

const authorization = (role:string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roles } = req.user;
    if(role.includes(roles)) return next();
    throw new appError(errorType.bad_request, `Access denied... Not authorized as ${roles}`);
  }
  catch (err) {
    return next(err);
  }
};

export default {
  requireAuth,
  authorization,
};