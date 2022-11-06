import { Action } from "routing-controllers";
import { isNil, isString } from "lodash";
import Container from "typedi";
import UserService from "../services/user.service";

export default async function authorizationChecker(action: Action): Promise<boolean> {
  const token: unknown = action?.request?.headers?.['authorization'] ?? '';
  const userService = Container.get(UserService);

  if(!isString(token)) return false;

  const replacedToken = token.replace(/Bearer /gi, "");
  const user = await userService.checkToken(replacedToken);
  
  return !isNil(user); 
}