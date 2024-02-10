import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get("users")
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get("users/:id")
  getUserById() {
    return null;
  }
}
