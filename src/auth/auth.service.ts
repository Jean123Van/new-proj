import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository,
                private readonly jwtService: JwtService){}

    async register(registerDto: RegisterDto){

        const {password, username, email} = registerDto

        const [name] = await this.userRepository.find({username})
        const [emailAd] = await this.userRepository.find({email})

        if (name){
            throw new BadRequestException('username already exists')
        }
        if(emailAd){
            throw new BadRequestException('email already exists')
        }
        
        if(!/[A-Z]/.test(password)){
            throw new BadRequestException('password must contain at least one uppercase letter')
        } else if (!/[a-z]/.test(password)){
            throw new BadRequestException('password must contain at least one lowercase letter')
        } else if (!/[^a-zA-Z0-9]/.test(password)){
            throw new BadRequestException('password must contain at least one special character')
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        this.userRepository.save({...registerDto, password:hashedPassword})
    }

    async login(loginDto:LoginDto){
        const {username, password} = loginDto
        const [user] = await this.userRepository.find({username})

        if(!user){
            throw new BadRequestException('Invalid username or password')
        }
        
        const valid = await bcrypt.compare(password,user.password)

        if(!valid){
            throw new BadRequestException('Invalid username or password')
        }

        const {first_name, last_name} = user

        const payload = {username, first_name, last_name}
        const accessToken: string = await this.jwtService.sign(payload)

        return {accessToken}
    }

}
