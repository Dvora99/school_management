import { Router } from 'express';
import { reportController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const report = new reportController();

  route.post('/addReport', Roles.authorization(['Teacher']), report.addReport);
  route.get('/showReport', Roles.authorization(['Teacher']), report.showReport);
  route.delete('/deleteReport/:id', Roles.authorization(['Teacher']), report.deleteReport);
  route.put('/updateReport/:id', Roles.authorization(['Teacher']), report.updateReport);

  return route;
}