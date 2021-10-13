import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

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
    @Matches(/[A-Z]/,{message:'password must contain at least one uppercase letter'})
    @Matches(/[a-z]/,{message:'password must contain at least one lowercase letter'} )
    @Matches(/[^a-zA-Z0-9]/,{message:'password must contain at least one special letter'})
    password: string
} 