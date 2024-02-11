import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/auth/decorators";
import { JwtGuard } from "src/auth/guard";
import { EditTodoDto, createTodoDto } from "./dto";
import { TodoService } from "./todo.service";

@UseGuards(JwtGuard)
@Controller("todos")
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@GetUser("id") userId: string) {
    return this.todoService.getTodos(userId);
  }

  @Post()
  createTodo(@GetUser("id") userId: string, @Body() dto: createTodoDto) {
    return this.todoService.createTodo(userId, dto);
  }

  @Get(":id")
  getTodosById(@GetUser("id") userId: string, @Param("id") todoId: string) {
    return this.todoService.getTodoById(userId, todoId);
  }

  @Patch(":id")
  editTodoById(
    @GetUser("id") userId: string,
    @Param("id") todoId: string,
    @Body() dto: EditTodoDto,
  ) {
    this.todoService.editTodoById(userId, todoId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteTodoById(@GetUser("id") userId: string, @Param("id") todoId: string) {
    return this.deleteTodoById(userId, todoId);
  }
}
