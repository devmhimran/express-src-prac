import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TYPES } from '../constants/type';
import { IUserService } from '../interfaces/IUserSercice';

const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(UserController).toSelf();

export { container };
