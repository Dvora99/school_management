import { Router } from 'express';
import { scheduleController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const schedule = new scheduleController();

  route.get('/getSchedule', Roles.authorization(['Student']), schedule.getSchedule);

  return route;
}

