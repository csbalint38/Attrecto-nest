import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Todo } from "@prisma/client";
import { DbService } from "src/db/db.service";
import { AuthDto } from "src/dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}
  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          pswhash: hash,
        },
      });
      delete user.pswhash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("User alredy exist");
        }
      }
      throw error;
    }
  }

  login() {}
}
