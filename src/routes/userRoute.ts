import express from 'express';
import { userController } from '../controllers/index';

const route = express.Router();

route.post('/userInsert', userController.userInsert);
route.delete('/userDelete/:id', userController.userDelete);
route.put('/userUpdate/:id', userController.userUpdate);

route.post('/userLogin', userController.userLogin);

export default route;