import express, { Express } from 'express';
import { END_POINT } from '../constant/endpoint';
import Roles from '../middleware/passportStretagy';
import userRoute from './userRoute';
import classRoute from './classRoute';
import attendanceRoute from './attendanceRoute';
import lectureRoute from './lectureRoute';
import reportRoute from './reportRoutes';
import studentRoute from './studentRoutes';
import scheduleRoute from './scheduleRoute';

const route = express.Router();

export function initRoutes(app: Express) {
  app.use(END_POINT.USER, userRoute(route));
  app.use(END_POINT.STUDENTS, Roles.requireAuth, studentRoute(route));
  app.use(END_POINT.SCHEDULE, Roles.requireAuth, scheduleRoute(route));
  app.use(END_POINT.REPORT, Roles.requireAuth, reportRoute(route));
  app.use(END_POINT.LECTURE, Roles.requireAuth, lectureRoute(route));
  app.use(END_POINT.CLASS, Roles.requireAuth, classRoute(route));
  app.use(END_POINT.ATTENDANCE, Roles.requireAuth, attendanceRoute(route));
}