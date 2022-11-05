import { Controller } from "routing-controllers";
import bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import UserModel, { User } from "../models/user";

@Controller()
@Service()
export default class UserService {
  async createUser(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 12);
    const doc = new UserModel({ username, password: hash });

    await doc.save();

    return doc;
  }

  async getAllUsers(): Promise<User[]> {
    return await UserModel.find({}, { password: 0, _id: 0, __v: 0 }).lean();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });

    return user;
  }
}