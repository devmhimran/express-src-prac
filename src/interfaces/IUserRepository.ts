export interface IUserRepository {
  getUsers: (page: number, limit: number) => Promise<unknown[]>;
  getTotalUsers: () => Promise<any>;
  getUserById(id: string): Promise<any>;
  createUser(name: string, email: string, password: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
}
