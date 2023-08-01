import express from 'express';
import reportController from '../controllers/reportController';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addReport', [ Roles.requireAuth, Roles.teacherAuth ] , reportController.addReport);

export default route;