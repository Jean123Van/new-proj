import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDto {
    
    @IsAlpha()
    @Length(0,60)
    @IsNotEmpty()
    first_name: string;

    @IsAlpha()
    @Length(0,60)
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @Length(0,70)
    email: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(4,20)
    username: string;

    @Length(8,32)
    password: string
} 