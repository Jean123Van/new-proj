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

        const user = await this.userRepository.findOne({where: [{username},{email}]})

        this.userRepository.registrationValidation(user,email,username)

        const salt = await bcrypt.genSalt()

        const hashedPassword = await bcrypt.hash(password,salt)

        this.userRepository.save({...registerDto, password:hashedPassword})
    }

    async login(loginDto:LoginDto){
        const {username, password} = loginDto
        const [user] = await this.userRepository.find({username})

        this.userRepository.userValidation(user)
        
        const valid = await bcrypt.compare(password,user.password)

        this.userRepository.passwordValidation(valid)

        const {first_name, last_name} = user

        const payload = {username, first_name, last_name}
        const accessToken: string = await this.jwtService.sign(payload)

        return {accessToken}
    }

}
