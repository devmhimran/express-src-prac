export interface IUserService {
  getUsers: () => Promise<any>;
  getUserById(id: string): Promise<any>;
  createUser(name: string, email: string): Promise<any>;
}
