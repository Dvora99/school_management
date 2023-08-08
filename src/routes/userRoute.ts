import { Router } from 'express';
import { userController } from '../controllers/index';

export default function initRoutes(router: Router) {
  const route = router;
  const users = new userController();

  route.post('/userInsert', users.userInsert);
  route.delete('/userDelete/:id', users.userDelete);
  route.put('/userUpdate/:id', users.userUpdate);
  route.post('/userLogin', users.userLogin);

  return route;
}