import express from 'express';
import { classController } from '../controllers/index';

const route = express.Router();

route.post('/addClass', classController.addClass);
route.delete('/deleteClass/:id', classController.deleteClass);

export default route;