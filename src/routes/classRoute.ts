import express from 'express';
import { classController } from '../controllers/index';

const route = express.Router();

route.post('/addClass', classController.addClass);

export default route;