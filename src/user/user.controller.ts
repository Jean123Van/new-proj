import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from './dto/filter.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/:id')
    getOne(@Param('id') userId:string){
        return this.userService.getOne(userId)
    }

    @Get()
    getList(@Query() filter: FilterDto){
        return this.userService.getList(filter)
    }

}
