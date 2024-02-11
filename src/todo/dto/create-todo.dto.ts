import {
  IsDateString,
  IsOptional,
  IsString,
  isNotEmpty,
} from "class-validator";

export class createTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
