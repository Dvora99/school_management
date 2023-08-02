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
route.use('/class', [ Roles.requireAuth, Roles.principalAuth ], classRoute);
route.use('/attendance', [ Roles.requireAuth, Roles.teacherAuth ], attendanceRoute);
route.use('/lecture', [ Roles.requireAuth, Roles.teacherAuth ], lectureRoute);
route.use('/report', [ Roles.requireAuth, Roles.teacherAuth ], reportRoute);
route.use('/students', [ Roles.requireAuth, Roles.teacherAuth ], studentRoute);
route.use('/schedule', [ Roles.requireAuth, Roles.studentAuth ] , scheduleRoute);

export default route;