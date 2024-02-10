import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
