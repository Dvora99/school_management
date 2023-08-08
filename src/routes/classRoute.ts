import { Router } from 'express';
import { classController } from '../controllers/index';
import Roles from '../middleware/passportStretagy';

export default function initRoutes(router: Router) {
  const route = router;
  const classes = new classController();

  route.post('/addclass', Roles.authorization(['Principal']), classes.addClass);
  route.delete('/deleteclass/:id', Roles.authorization(['Principal']), classes.deleteClass);
  route.get('/viewclass', Roles.authorization(['Principal']), classes.viewClass);
  route.put('/updateclass/:id', Roles.authorization(['Principal']), classes.updateClass);

  return route;
}