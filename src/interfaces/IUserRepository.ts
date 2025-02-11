export interface IUserRepository {
  getUsers: () => Promise<any>;
  getUserById(id: string): Promise<any>;
  createUser(user: any): Promise<any>;
}
