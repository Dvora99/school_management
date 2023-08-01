import express from 'express';
import { lectureController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addLecture', lectureController.addLecture);

export default route;