import express from 'express';
import { userController } from '../controllers/index';

const route = express.Router();

route.post('/', userController.userInsert);
route.post('/userLogin', userController.userLogin);

export default route;