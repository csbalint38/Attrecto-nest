import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async getAllUser() {
    try {
      const users = await this.db.user.findMany({
        select: {
          email: true,
          firstName: true,
          lastName: true,
          profilePicURL: true,
        },
      });
      return users;
    } catch (error) {
      console.log("Error fetching users", error);
    }
  }

  //async getUserById(@Param("id") id: string) {
  //const user = await
  //}
}
