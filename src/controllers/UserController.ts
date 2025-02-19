import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../constants/type';
import { IUserService } from '../interfaces/IUserService';
import { createUserSchema } from '../validators/UserValidators';

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  async getUsers(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
      const result = await this.userService.getUsers(page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const validateData = createUserSchema.parse({ name, email, password });
      const newUser = await this.userService.createUser(
        validateData.name,
        validateData.email,
        validateData.password
      );
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}
