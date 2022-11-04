import { BadRequestError, Body, Get, JsonController, Post } from "routing-controllers";
import { CreateUserSchema } from "../schemas/user.schema";
import UserService from "../services/user.service";
import { Service } from 'typedi';

@JsonController('/users')
@Service()
export default class UserController {
  constructor(private userService: UserService) {}

  @Post("/")
  async createUser(@Body() body: unknown) {
    const result = await CreateUserSchema.spa(body);

    if(!result.success) {
      throw new BadRequestError(result.error.issues.map(i => i.message).join(', '));
    }

    const { username, password } = result.data;

    await this.userService.createUser(username, password)
    
    return {
      message: `User ${username} has been created`,
      success: true,
    }
  }
}