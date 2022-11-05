import { Action } from "routing-controllers";
import { isNil, isString } from "lodash";
import Container from "typedi";
import UserService from "../services/user.service";
import { User } from "../models/user";

export default async function getCurrentUser(action: Action): Promise<User> {
  const token: unknown = action?.request?.headers?.['authorization'] ?? '';
  const userService = Container.get(UserService);

  if(!isString(token)) throw new Error("You are not logged in");

  const replacedToken = token.replace(/Bearer /gi, "");
  const user = await userService.checkToken(replacedToken);
  
  if(isNil(user)) throw new Error("You are not logged in");

  return user;
}