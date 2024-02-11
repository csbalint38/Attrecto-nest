import { ForbiddenException, Injectable } from "@nestjs/common";
import { EditTodoDto, createTodoDto } from "./dto";
import { DbService } from "src/db/db.service";

@Injectable()
export class TodoService {
  constructor(private db: DbService) {}

  getTodos(userId: string) {
    return this.db.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async createTodo(userId: string, dto: createTodoDto) {
    const todo = await this.db.todo.create({
      data: {
        userId,
        ...dto,
      },
    });

    return todo;
  }

  async getTodoById(userId: string, todoId: string) {
    return this.db.todo.findFirst({
      where: {
        id: todoId,
        userId,
      },
    });
  }

  async editTodoById(userId: string, todoId: string, dto: EditTodoDto) {
    const todo = await this.db.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException("Access to this todo is denied");
    }

    return this.db.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTodoById(userId: string, todoId: string) {
    const todo = await this.db.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException("Access to this todo is denied");
    }
    await this.db.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
