import express from 'express';
import { scheduleController } from '../controllers/index';

const route = express.Router();

route.get('/getSchedule', scheduleController.getSchedule);

export default route;