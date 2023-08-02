import express from 'express';
import reportController from '../controllers/reportController';

const route = express.Router();

route.post('/addReport', reportController.addReport);

export default route;