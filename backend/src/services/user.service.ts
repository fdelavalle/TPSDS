import { Controller } from "routing-controllers";
import { User } from "../entities/user";
import bcrypt from 'bcryptjs';
import { Service } from 'typedi';

@Controller()
@Service()
export default class UserService {
  async createUser(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 12);
    return new User(username, hash);
  }
}