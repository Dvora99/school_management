import express from 'express';
import { classController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addClass', [ Roles.requireAuth, Roles.principalAuth ], classController.addClass);
route.delete('/deleteClass/:id', [ Roles.requireAuth, Roles.principalAuth ], classController.deleteClass);

export default route;