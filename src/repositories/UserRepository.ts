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
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async getTotalUsers() {
    return await prisma.user.count();
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(name: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
