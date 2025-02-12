export interface IUserRepository {
  getUsers: (page: number, limit: number) => Promise<unknown[]>;
  getTotalUsers: () => Promise<any>;
  getUserById(id: string): Promise<any>;
  createUser(user: any): Promise<any>;
}
