import { Injectable } from "@nestjs/common";
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

  getTodosById(userId: string, todoId: string) {}

  editTodoById(userId: string, todoId: string, dto: EditTodoDto) {}

  deleteTodoById(userId: string, todoId: string) {}
}
