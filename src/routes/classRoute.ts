import express from 'express';
import { classController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addClass', Roles.authorization(['Principal']) , classController.addClass);
route.delete('/deleteClass/:id', classController.deleteClass);
route.get('/viewClass', classController.viewClass);
route.put('/updateClass/:id', classController.updateClass);

export default route;