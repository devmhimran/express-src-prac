import { injectable, inject } from 'inversify';

import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserSercice';
import { TYPES } from '../constants/type';
import { Pagination } from '../utils';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(Pagination) private pagination: Pagination
  ) {}

  async getUsers(page: number = 1, limit: number = 10) {
    return this.pagination.paginate(
      () => this.userRepository.getUsers(page, limit),
      () => this.userRepository.getTotalUsers(),
      page,
      limit
    );
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(name: string, email: string) {
    return await this.userRepository.createUser({ name, email });
  }
}
