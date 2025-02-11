import { injectable } from 'inversify';
import { prisma } from '../config/prisma';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: { name: string; email: string }) {
    return await prisma.user.create({ data });
  }
}
