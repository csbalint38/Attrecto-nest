import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DbService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "mongodb+srv://balintcsefalvay:QX9rBS5QtJBuzVoD@cluster0.lnhgqyg.mongodb.net/test",
        },
      },
    });
  }
}
