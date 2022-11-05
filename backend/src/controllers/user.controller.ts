import { BadRequestError, Body, Get, JsonController, Post } from "routing-controllers";
import { CreateUserSchema } from "../schemas/user.schema";
import UserService from "../services/user.service";
import { Service } from 'typedi';
import { isNil } from "lodash";

@JsonController('/users')
@Service()
export default class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getUsers() {
    const users = await this.userService.getAllUsers();

    return {
      data: users,
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
}