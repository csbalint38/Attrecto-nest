import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body dto: AuthDto) {
    this.authService.register();
  }

  @Post("login")
  login() {
    this.authService.login();
  }
}
