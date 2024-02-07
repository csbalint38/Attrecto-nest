import { Injectable } from "@nestjs/common";
import { User, Todo } from "@prisma/client";
import { DbService } from "src/db/db.service";

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}
  login() {}
  register() {}
}
