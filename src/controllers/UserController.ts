import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '../constants/type';
import { IUserService } from '../interfaces/IUserSercice';

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      console.log({ users });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
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

  async addUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const newUser = await this.userService.createUser(name, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
