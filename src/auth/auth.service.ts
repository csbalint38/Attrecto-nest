import { ForbiddenException, Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          pswhash: hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("User alredy exist");
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException("User does not exist");

    const isPswCorrect = await argon.verify(user.pswhash, dto.password);

    if (!isPswCorrect) throw new ForbiddenException("Incorrect passwor");

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(data, {
      expiresIn: "15m",
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
