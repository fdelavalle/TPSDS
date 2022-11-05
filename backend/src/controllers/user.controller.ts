import { Authorized, BadRequestError, Body, CurrentUser, Get, JsonController, Post, Put } from "routing-controllers";
import { CreateUserSchema, LoginUserSchema } from "../schemas/user.schema";
import UserService from "../services/user.service";
import { Service } from 'typedi';
import { isNil } from "lodash";
import { User } from "../models/user";

@JsonController('/users')
@Service()
export default class UserController {
  constructor(private userService: UserService) {}

  @Authorized()
  @Get("/")
  async getUsers() {
    const users = await this.userService.getAllUsers();

    return {
      users,
      success: true
    }
  }

  @Post("/")
  async createUser(@Body() body: unknown) {
    const result = await CreateUserSchema.spa(body);

    if(!result.success) {
      throw new BadRequestError(result.error.issues.map(i => i.message).join(', '));
    }

    const { username, password } = result.data;

    if(!isNil(await this.userService.getUserByUsername(username))) {
      throw new BadRequestError(`User ${username} already exists`)
    }

    await this.userService.createUser(username, password);
    
    return {
      message: `User ${username} has been created`,
      success: true,
    }
  }

  @Post("/login")
  async logInUser(@Body() body: unknown) {
    const result = await LoginUserSchema.spa(body);

    if(!result.success) {
      throw new BadRequestError(result.error.issues.map(i => i.message).join(', '));
    }

    const { username, password } = result.data;

    const user = await this.userService.getUserByUsername(username);

    try {
      if(isNil(user)) throw new Error("Invalid username");

      const token = await this.userService.authenticateUser(user, password);

      return {
        token,
        success: true
      }
    } catch(err) {
      throw new BadRequestError("Invalid username or password");
    }
  }

  @Authorized()
  @Get("/me")
  async myProfile(@CurrentUser({ required: true }) user: User) {
    return {
      success: true,
      user,
    }
  }

  @Authorized()
  @Put("/withdraw")
  async withdrawMoney(@CurrentUser({ required: true }) user: User) {
    await this.userService.withdrawMoney(user._id);

    const updatedUser = await this.userService.getUserById(user._id);

    return {
      success: true,
      user: updatedUser,
    }
  }
}