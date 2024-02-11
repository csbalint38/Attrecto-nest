import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { getUser } from "../auth/decorators/get-user.decorator";
import { User } from "@prisma/client";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtGuard)
  @Get("me")
  getUserById(@getUser() user: User) {
    return user;
  }
}
