import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { EditUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.pswhash;

    return user;
  }
}
