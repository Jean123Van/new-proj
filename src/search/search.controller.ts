import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from './dto/filter.dto';
import { SearchService } from './search.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get('/:id')
    search(@Param('id') id:string){
        return this.searchService.search(id)
    }

    @Get()
    list(@Query() filter: FilterDto){
        return this.searchService.list(filter)
    }

}
