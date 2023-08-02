import express from 'express';
import { userController } from '../controllers/index';

const route = express.Router();

route.post('/userInsert', userController.userInsert);
route.post('/userLogin', userController.userLogin);

export default route;