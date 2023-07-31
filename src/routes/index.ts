import express from 'express';
import userRoute from './userRoute';
import classRoute from './classRoute';
const route = express.Router();

route.use('/user', userRoute);
route.use('/class', classRoute);
route.use('/attendance', )

export default route;