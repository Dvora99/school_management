import express from 'express';
import { scheduleController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.get('/getSchedule', Roles.authorization(['Student']), scheduleController.getSchedule);

export default route;