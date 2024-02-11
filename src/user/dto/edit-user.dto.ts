import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsUrl()
  @IsOptional()
  profilePicUR?: string;
}
