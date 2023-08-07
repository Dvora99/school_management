import express from 'express';
import Roles from '../middleware/passportStretagy';
import userRoute from './userRoute';
import classRoute from './classRoute';
import attendanceRoute from './attendanceRoute';
import lectureRoute from './lectureRoute';
import reportRoute from './reportRoutes';
import studentRoute from './studentRoutes';
import scheduleRoute from './scheduleRoute';

const route = express.Router();

route.use('/user', userRoute);
route.use('/class', Roles.requireAuth, classRoute);
route.use('/attendance', Roles.requireAuth, attendanceRoute);
route.use('/lecture', Roles.requireAuth, lectureRoute);
route.use('/report', Roles.requireAuth, reportRoute);
route.use('/students', Roles.requireAuth, studentRoute);
route.use('/schedule', Roles.requireAuth, scheduleRoute);

export default route;