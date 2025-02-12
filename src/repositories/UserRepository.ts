import { injectable } from 'inversify';
import { prisma } from '../config/prisma';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async getUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return prisma.user.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getTotalUsers() {
    return await prisma.user.count();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async createUser(data: { name: string; email: string }) {
    return await prisma.user.create({ data });
  }
}
