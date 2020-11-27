import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    title:string

    @IsString()
    @IsOptional()
    email:string
}