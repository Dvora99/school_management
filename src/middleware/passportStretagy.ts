import passport from 'passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/userModel';
import Token from '../models/tokenModel';
import { Request, Response, NextFunction } from 'express';

config();

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true
}, async (req, user, done) => {
  const { roles } = user;
  const data:any = await User.findOne({
    where: { roles },
    include: {
      model: Token
    },
  });
  return done(null, data.roles);
}));

const requireAuth = passport.authenticate('jwt', { session: false });

const principalAuth = (req: Request ,res: Response, next: NextFunction) => {
  if(req.user === 'Principal') return next();
  else console.log('Access denied. Not authorized as Principal.');
};

const teacherAuth = (req: Request ,res: Response, next: NextFunction) => {
  if(req.user === 'Teacher') return next();
  else console.log('Access denied. Not authorized as Teacher.');
};

const studentAuth = (req: Request ,res: Response, next: NextFunction) => {
  if(req.user === 'Student') return next();
  else console.log('Access denied. Not authorized as Teacher.');
};

export default {
  requireAuth,
  principalAuth,
  teacherAuth,
  studentAuth
};