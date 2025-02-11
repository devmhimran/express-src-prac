import express from 'express';
import { container } from '../config/inversify.config';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const userController = container.get(UserController);

router.get(
  '/:id',
  userController.getUser.bind(userController) as express.RequestHandler
);
router.get(
  '/',
  userController.getUsers.bind(userController) as express.RequestHandler
);
router.post(
  '/',
  userController.addUser.bind(userController) as express.RequestHandler
);

export default router;
