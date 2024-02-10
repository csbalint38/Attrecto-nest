import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  getUserById() {
    return null;
  }
}
