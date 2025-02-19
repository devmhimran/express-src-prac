import express from 'express';
import { container } from '../config/inversify.config';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema } from '../validators/UserValidators';

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
  validateRequest(createUserSchema),
  userController.createUser.bind(userController) as express.RequestHandler
);

export default router;
