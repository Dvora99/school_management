import express from 'express';
import reportController from '../controllers/reportController';
import Roles from '../middleware/passportStretagy';

const route = express.Router();

route.post('/addReport', Roles.authorization(['Teacher']), reportController.addReport);
route.get('/showReport', Roles.authorization(['Teacher']), reportController.showReport);
route.delete('/deleteReport/:id', Roles.authorization(['Teacher']), reportController.deleteReport);
route.put('/updateReport/:id', Roles.authorization(['Teacher']), reportController.updateReport);

export default route;