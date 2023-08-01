import express from 'express';
import userRoute from './userRoute';
import classRoute from './classRoute';
import attendanceRoute from './attendanceRoute';
import lectureRoute from './lectureRoute';
import reportRoute from './reportRoutes';
import studentRoute from './studentRoutes';

const route = express.Router();

route.use('/user', userRoute);
route.use('/class', classRoute);
route.use('/attendance', attendanceRoute);
route.use('/lecture', lectureRoute);
route.use('/report', reportRoute);
route.use('/students', studentRoute);

export default route;