import { Controller } from "routing-controllers";
import bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import jwt from "jsonwebtoken";
import UserModel, { User } from "../models/user";
import { env } from "../../utils/env";
import { isNil, isUndefined, isString } from "lodash";

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
    const users = await UserModel.find({}, { __v: 0, password: 0 }).lean().exec();

    return users ?? [];
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ _id: id }, { __v: 0, password: 0 }).lean().exec();

    return user ?? null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username }).lean().exec();

    return user ?? null;
  }

  async authenticateUser(user: User, comparedPassword: string): Promise<string> {
    const result = await bcrypt.compare(comparedPassword, user.password);

    if(!result) {
      throw new Error("Invalid username or password")
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, env.JWT_TOKEN);

    return token;
  }

  async checkToken(token: string): Promise<User | null> {
    return new Promise((res, rej) => {
      jwt.verify(token, env.JWT_TOKEN, async (err, data) => {
        if(!isNil(err) || isUndefined(data) || isString(data)) return res(null);
  
        const objectId: unknown | null = data?.id ?? null;
  
        if(!isString(objectId)) return res(null);
  
        const user = await this.getUserById(objectId);
  
        if(isNil(user)) return res(null);

        return res(user);
      });
    })
  }

  async withdrawMoney(userId: string) {
    return await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { amountAvailable: -50 }});
  }
}