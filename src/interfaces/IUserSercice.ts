export interface IUserService {
  getUsers: (page: number, limit: number) => Promise<any>;
  getUserById(id: string): Promise<any>;
  createUser(name: string, email: string): Promise<any>;
}
