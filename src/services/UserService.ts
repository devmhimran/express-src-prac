import { injectable, inject } from 'inversify';

import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserSercice';
import { TYPES } from '../constants/type';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(name: string, email: string) {
    return await this.userRepository.createUser({ name, email });
  }
}
