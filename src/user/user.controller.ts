import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "@prisma/client";
import { EditUserDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getUserById(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser("id") userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
